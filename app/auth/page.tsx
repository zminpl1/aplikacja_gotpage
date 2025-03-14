"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useLanguage } from "@/contexts/language-context"
import { useToast } from "@/hooks/use-toast"

export default function AuthPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("login")
  const [accountType, setAccountType] = useState("user")

  // Login form state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // Register form state
  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("")
  const [registerPhone, setRegisterPhone] = useState("")
  const [registerNip, setRegisterNip] = useState("")
  const [registerTerms, setRegisterTerms] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!loginEmail || !loginPassword) {
      toast({
        title: t("auth.error"),
        description: t("auth.allFieldsRequired"),
        variant: "destructive",
      })
      return
    }

    // Simulate login
    toast({
      title: t("auth.success"),
      description: t("auth.loginSuccess"),
    })

    // Redirect to home page
    setTimeout(() => {
      router.push("/")
    }, 1500)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!registerName || !registerEmail || !registerPassword || !registerConfirmPassword) {
      toast({
        title: t("auth.error"),
        description: t("auth.allFieldsRequired"),
        variant: "destructive",
      })
      return
    }

    if (registerPassword !== registerConfirmPassword) {
      toast({
        title: t("auth.error"),
        description: t("auth.passwordsDoNotMatch"),
        variant: "destructive",
      })
      return
    }

    if (accountType === "business" && (!registerPhone || !registerNip)) {
      toast({
        title: t("auth.error"),
        description: t("auth.businessFieldsRequired"),
        variant: "destructive",
      })
      return
    }

    if (!registerTerms) {
      toast({
        title: t("auth.error"),
        description: t("auth.termsRequired"),
        variant: "destructive",
      })
      return
    }

    // Simulate registration
    toast({
      title: t("auth.success"),
      description: t("auth.registerSuccess"),
    })

    // Redirect to home page
    setTimeout(() => {
      router.push("/")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {activeTab === "login" ? t("auth.login") : t("auth.register")}
            </CardTitle>
            <CardDescription className="text-center">
              {activeTab === "login" ? t("auth.loginDescription") : t("auth.registerDescription")}
            </CardDescription>
          </CardHeader>

          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="px-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">{t("auth.login")}</TabsTrigger>
                <TabsTrigger value="register">{t("auth.register")}</TabsTrigger>
              </TabsList>
            </div>

            <CardContent className="p-6">
              <TabsContent value="login" className="mt-0">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("auth.email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">{t("auth.password")}</Label>
                      <Link href="/auth/reset-password" className="text-sm text-pink-500 hover:text-pink-600">
                        {t("auth.forgotPassword")}
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t("auth.rememberMe")}
                    </label>
                  </div>
                  <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700">
                    {t("auth.loginButton")}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="mt-0">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label>{t("auth.accountType")}</Label>
                    <RadioGroup
                      defaultValue="user"
                      value={accountType}
                      onValueChange={setAccountType}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="user" id="user" />
                        <Label htmlFor="user">{t("auth.userAccount")}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="business" id="business" />
                        <Label htmlFor="business">{t("auth.businessAccount")}</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">{t("auth.fullName")}</Label>
                    <Input id="name" value={registerName} onChange={(e) => setRegisterName(e.target.value)} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">{t("auth.email")}</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="email@example.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                  </div>

                  {accountType === "business" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t("auth.phone")}</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+48 123 456 789"
                          value={registerPhone}
                          onChange={(e) => setRegisterPhone(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="nip">{t("auth.nip")}</Label>
                        <Input
                          id="nip"
                          placeholder="0000000000"
                          value={registerNip}
                          onChange={(e) => setRegisterNip(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">{t("auth.nipDescription")}</p>
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="register-password">{t("auth.password")}</Label>
                    <Input
                      id="register-password"
                      type="password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">{t("auth.confirmPassword")}</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={registerConfirmPassword}
                      onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={registerTerms}
                      onCheckedChange={(checked) => setRegisterTerms(checked as boolean)}
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t("auth.acceptTerms")}{" "}
                      <Link href="/terms" className="text-pink-500 hover:text-pink-600">
                        {t("auth.termsLink")}
                      </Link>
                    </label>
                  </div>

                  <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700">
                    {t("auth.registerButton")}
                  </Button>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>

          <CardFooter className="flex flex-col space-y-4 p-6 pt-0">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">{t("auth.orContinueWith")}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline">
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                Facebook
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

