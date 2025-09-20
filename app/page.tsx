import Link from "next/link";
import Navbar from "./components/navigation/Navbar";
import Button from "./components/ui/Button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Flashcard Frenzy</h1>
          <p className="text-xl md:text-2xl mb-8">
            A real-time competitive quiz game where speed and accuracy matter.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth/signup">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/auth/signin">
              <Button variant="secondary" size="lg">Sign In</Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 border border-foreground/10 rounded-lg">
              <h2 className="text-xl font-bold mb-3">Real-time Competition</h2>
              <p>Race against other players to answer questions first and earn points.</p>
            </div>
            
            <div className="p-6 border border-foreground/10 rounded-lg">
              <h2 className="text-xl font-bold mb-3">Live Scoreboard</h2>
              <p>Watch the scores update in real-time as players answer questions.</p>
            </div>
            
            <div className="p-6 border border-foreground/10 rounded-lg">
              <h2 className="text-xl font-bold mb-3">Match History</h2>
              <p>Review your past games and track your progress over time.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
