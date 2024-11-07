import { getUserRole } from "@/actions/airtable";
import { useSession } from "@/context/session";
import { signInAnonymously } from "firebase/auth";
import { useAuth } from "reactfire";

export default function Login() {

    const auth = useAuth();
    const { sessionId } = useSession();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const passcode = formData.get('passcode') as string;

        if (!name || !passcode) {
            alert('Please enter a name and passcode');
            return;
        }

        // get the user role from the passcode
        const userRole = await getUserRole(sessionId, passcode);

        if (!userRole) {
            alert('Invalid passcode');
            return;
        };

        const { user } = await signInAnonymously(auth);

        if (!user) {
            alert('Sign in failed');
            return;
        }


        // 'the user role is', userRole, user.uid
    }

    // submit the login here, if it works, save the user id in localStorage and refresh the page
    return <div>
        <h1>Login to session:</h1>

        <form onSubmit={handleSubmit}>
            <p><input type="text" name="name" placeholder="Your name" className="w-full text-background" /></p>
            <p><input type="text" name="passcode" placeholder="Your passcode" className="w-full text-background" /></p>
            <button type="submit">Login</button>
        </form>
    </div>
}