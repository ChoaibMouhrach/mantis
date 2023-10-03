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
import useSignUp, { SignUpPayload, signUpSchema } from "@/hooks/use-sign-up";
import withGuest from "@/middlewares/with-guest";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignUp = () => {
  const router = useRouter();
  const { mutate: signUp, isLoading } = useSignUp();

  const form = useForm<SignUpPayload>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      password_confirmation: "",
      name: "",
    },
  });

  const onSubmit = (data: SignUpPayload) => {
    signUp(data, {
      onSuccess: () => {
        toast.success("Sign Up Success");
        router.push("/dashboard/apps");
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || "Sign Up Failed");
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
            <h1 className="text-3xl font-semibold">Sign Up</h1>
            <p className="text-muted-foreground text-sm">
              Enter your informations to Sign Up
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John Doe" />
                  </FormControl>
                  <FormDescription>Enter your full name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      placeholder="example@example.com"
                    />
                  </FormControl>
                  <FormDescription>Enter your email address</FormDescription>
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
                  <FormDescription>Enter your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Confirmation</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} placeholder="********" />
                  </FormControl>
                  <FormDescription>
                    Enter your password confirmation
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button isLoading={isLoading}>Sign Up</Button>
          </div>

          <div className="flex items-center">
            <Separator className="shrink" />
            <p className="text-sm text-muted-foreground px-4">OR</p>
            <Separator className="shrink" />
          </div>

          <Button variant="outline" asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
};

export const getServerSideProps = withGuest();
export default SignUp;
