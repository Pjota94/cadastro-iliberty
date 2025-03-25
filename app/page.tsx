"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { supabase } from "@/lib/supabaseClient" // Certifique-se de criar este arquivo

interface User {
  id: string // Alterado para string pois o Supabase usa UUID
  name: string
  email: string
  created_at?: string
}

export default function UserRegistration() {
  const [users, setUsers] = useState<User[]>([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Carrega os usuários do Supabase
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('users') // Nome da tabela no Supabase
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error

        setUsers(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar usuários')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()

    // Configura subscription para atualizações em tempo real
    const subscription = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'users' },
        () => fetchUsers()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('users')
        .insert([{ name, email }])
        .select()

      if (error) throw error

      // Limpa o formulário após o sucesso
      setName("")
      setEmail("")
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao cadastrar usuário')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="flex justify-center mb-8">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoiLiberty-NYh7baWF1vI4zZqQp6OREzs0Ojiqxu.png"
            alt="iLiberty Logo"
            width={100}
            height={40}
            priority
          />
        </div>

        <Card className="mb-6 border-liberty-blue/20">
          <CardHeader className="bg-liberty-blue text-white rounded-t-md">
            <CardTitle>Cadastrar Novo Usuário</CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="border-liberty-blue/20 focus:border-liberty-turquoise focus:ring-liberty-turquoise"
                  disabled={loading}
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-liberty-blue/20 focus:border-liberty-turquoise focus:ring-liberty-turquoise"
                  disabled={loading}
                />
              </div>
              <Button 
                type="submit" 
                className="bg-liberty-turquoise hover:bg-liberty-turquoise/90 text-white"
                disabled={loading}
              >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </Button>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
          </CardContent>
        </Card>

        <Card className="border-liberty-blue/20">
          <CardHeader className="bg-liberty-blue text-white rounded-t-md">
            <CardTitle>Usuários Cadastrados</CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            {loading ? (
              <p className="text-gray-500">Carregando...</p>
            ) : users.length > 0 ? (
              <ul className="space-y-2">
                {users.map((user) => (
                  <li
                    key={user.id}
                    className="bg-gray-50 p-3 rounded border border-liberty-blue/10 hover:border-liberty-turquoise/30 transition-colors"
                  >
                    <strong className="text-liberty-blue">{user.name}</strong> - {user.email}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Nenhum usuário cadastrado ainda.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}