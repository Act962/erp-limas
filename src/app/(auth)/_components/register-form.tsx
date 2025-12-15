"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const signUpSchema = z
  .object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.email("E-mail inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "Senha deve ter pelo menos 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type SignUpSchema = z.infer<typeof signUpSchema>;

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSignUp = async (data: SignUpSchema) => {
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
      },
      {
        onSuccess: () => {
          toast.success("Conta criada com sucesso");
          router.push("/create-organization");
        },
        onError: () => {
          toast.error("Erro ao criar conta");
        },
      }
    );
  };
  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Crie sua conta</CardTitle>
          <CardDescription>
            Insira seu e-mail abaixo para criar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSignUp)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Nome</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  disabled={isSubmitting}
                  {...form.register("name")}
                />
                <FieldError>{form.formState.errors.name?.message}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="email">E-mail</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="johndoe@example.com"
                  disabled={isSubmitting}
                  {...form.register("email")}
                />
                <FieldError>{form.formState.errors.email?.message}</FieldError>
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Senha</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
                      disabled={isSubmitting}
                      {...form.register("password")}
                    />
                    <FieldError>
                      {form.formState.errors.password?.message}
                    </FieldError>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirmar Senha
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="********"
                      disabled={isSubmitting}
                      {...form.register("confirmPassword")}
                    />
                    <FieldError>
                      {form.formState.errors.confirmPassword?.message}
                    </FieldError>
                  </Field>
                </Field>
                <FieldDescription>
                  Deve ter pelo menos 8 caracteres.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Criar Conta
                </Button>
                <FieldDescription className="text-center">
                  Já tem uma conta? <Link href="/login">Entrar</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Ao clicar em continuar, você concorda com nossos{" "}
        <Link href="#">Termos de Serviço</Link> e{" "}
        <Link href="#">Política de Privacidade</Link>.
      </FieldDescription>
    </div>
  );
}
