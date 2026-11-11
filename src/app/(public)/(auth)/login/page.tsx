import LoginForm from "@/components/form/loginForm";

const LoginPage = () => {
  return (
    <section className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center bg-green-50/50 px-4">
      <LoginForm />
    </section>
  );
};

export default LoginPage;