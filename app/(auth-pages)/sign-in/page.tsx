import { signInAction } from "@/lib/actions/supabase-actions";
import { FormMessage, Message } from "@/components/supabase/form-message";
import { SubmitButton } from "@/components/supabase/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <form className="mx-auto flex min-w-64 flex-1 flex-col">
      <h1 className="text-2xl font-medium">Intră ca administrator</h1>

      <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="nume@examplu.com" required />
        <Label htmlFor="password">Parolă</Label>
        <Input
          type="password"
          name="password"
          placeholder="Parola ta"
          required
        />
        <SubmitButton pendingText="Signing In..." formAction={signInAction}>
          Intră ca administrator
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
