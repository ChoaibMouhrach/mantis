import AuthLayout from "@/components/layouts/auth";
import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useSignIn, { SignInPayload, signInSchema } from "@/hooks/use-sign-in";
import withGuest from "@/middlewares/with-guest";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignIn = () => {
  const { mutate: signIn, isLoading } = useSignIn();
  const router = useRouter();

  const form = useForm<SignInPayload>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInPayload) => {
    signIn(data, {
      onSuccess: () => {
        toast.success("Sign In successfully");
        router.push("/dashboard");
      },
      onError: (err) => {
        toast.error(err.response?.data.message);
      },
    });
  };

  return (
    <AuthLayout>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-full max-w-md"
        >
          <div className="w-fit">
            <Logo />
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold">Sign In</h1>
            <p className="text-muted-foreground text-sm">
              Enter your email address and password to Sign In
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      placeholder="example@example.com"
                    />
                  </FormControl>
                  <FormDescription>
                    We'll never share your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} placeholder="********" />
                  </FormControl>
                  <FormDescription>
                    We'll never share your password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button isLoading={isLoading}>Sign In</Button>
          </div>

          <div className="flex items-center">
            <Separator className="shrink" />
            <p className="text-sm px-4 text-muted-foreground">OR</p>
            <Separator className="shrink" />
          </div>

          <Button variant="outline" asChild>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
};

export const getServerSideProps = withGuest();
export default SignIn;
