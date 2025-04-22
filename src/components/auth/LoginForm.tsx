
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/stores/authStore";

// Form schema
const loginSchema = z.object({
  email: z.string().email("Ingrese un email válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      // This would be an API call in a real application
      // Simulating API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simulate successful login - in a real app, this would come from your backend
      if (data.email === "admin@example.com" && data.password === "admin123") {
        login(
          { id: "1", email: data.email, role: "admin" },
          "fake-jwt-token"
        );
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido al panel de administración",
        });
        navigate("/admin/dashboard");
      } else if (data.email === "user@example.com" && data.password === "user123") {
        login(
          { id: "2", email: data.email, role: "customer" },
          "fake-jwt-token"
        );
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido a GameStore",
        });
        navigate("/products");
      } else {
        throw new Error("Credenciales incorrectas");
      }
    } catch (error) {
      toast({
        title: "Error de inicio de sesión",
        description: error instanceof Error ? error.message : "Credenciales incorrectas",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gaming-card rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">
            Email
          </label>
          <input
            {...register("email")}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
            placeholder="tu@email.com"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">
            Contraseña
          </label>
          <input
            {...register("password")}
            type="password"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
            placeholder="******"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full gaming-button py-2 px-4 rounded-md"
        >
          {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ¿No tienes una cuenta?{" "}
            <a
              href="/register"
              className="text-gaming-primary hover:underline"
            >
              Regístrate
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
