"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface User {
  id: number
  name: string
  email: string
}

export default function UserRegistration() {
  const [users, setUsers] = useState<User[]>([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && email) {
      const newUser: User = {
        id: Date.now(),
        name,
        email,
      }
      setUsers([...users, newUser])
      setName("")
      setEmail("")
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

        {/*<h1 className="text-2xl font-bold mb-4 text-liberty-blue text-center">Sistema de Cadastro de Usuários</h1>*/}
        <Card className="mb-6 border-liberty-turquoise/20">
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
                />
              </div>
              <Button type="submit" className="bg-liberty-turquoise hover:bg-liberty-turquoise/90 text-white">
                Cadastrar
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-liberty-turquoise/20">
          <CardHeader className="bg-liberty-blue text-white rounded-t-md">
            <CardTitle>Usuários Cadastrados</CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            {users.length > 0 ? (
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

