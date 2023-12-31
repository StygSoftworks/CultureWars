import Link from 'next/link';
import Layout from '../components/Layout';

export default function Rules() {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Game Rules</h1>

        <h2 className="text-2xl mt-4">Objective</h2>
        <p>The objective of Culture Wars is to mock, ridicule, and outwit your opponent in a satirical battle of wits and cultural references.</p>

        <h2 className="text-2xl mt-4">Components</h2>
        <ul className="list-disc ml-8">
          <li>Deck of Cards: Create a deck of culture-themed cards, including pop culture references, memes, famous personalities, and absurd situations.</li>
          <li>Player Tokens: Each player starts with a certain number of tokens (e.g., Sarcasm Tokens) representing their wit or mockery power.</li>
          <li>Play Area: Set up a playmat or play area where players will place their cards.</li>
        </ul>

        <h2 className="text-2xl mt-4">Setup</h2>
        <p>Each player starts with a shuffled deck of Culture Wars cards.</p>
        <p>Both players begin with a fixed number of Sarcasm Tokens, say 20.</p>

        <h2 className="text-2xl mt-4">Gameplay</h2>

        <h3 className="text-xl mt-2">Draw Phase</h3>
        <p>At the start of your turn, draw one card from your deck.</p>

        <h3 className="text-xl mt-2">Main Phase</h3>
        <ul className="list-disc ml-8">
          <li>Play Cards: You can play one card from your hand during your main phase. Each card has a cost in Sarcasm Tokens.</li>
          <li>Activate Abilities: Some cards may have special abilities that you can activate during your turn.</li>
        </ul>

        <h3 className="text-xl mt-2">Battle Phase</h3>
        <p>If you have any Attack cards in play, you can declare an attack against your opponent.</p>
        <p>Opponent can play Defense cards or use special abilities to defend against the attack.</p>
        <p>Calculate the damage dealt, and deduct Sarcasm Tokens from your opponent's total.</p>

        <p className="text-xl mt-4">End Phase: End your turn.</p>

        <h2 className="text-2xl mt-4">Card Types</h2>
        <ul className="list-disc ml-8">
          <li>Character Cards: These represent cultural references, personalities, or fictional characters. They have attack and defense stats.</li>
          <li>Event Cards: These cards introduce absurd situations or events that affect the game, such as Internet Outage or Alien Invasion.</li>
          <li>Meme Cards: These cards may have humorous effects or reference internet memes.</li>
          <li>Artifact Cards: Powerful items or artifacts that can enhance your characters or abilities.</li>
          <li>Instant Cards: Can be played at any time, even during your opponent's turn, to disrupt their plans or enhance your own.</li>
        </ul>

        <h2 className="text-2xl mt-4">Winning</h2>
        <p>The game continues until one player's Sarcasm Tokens reach zero or below. The player with the most Sarcasm Tokens left wins the Culture Wars.</p>

        <p className="mt-8">
          <Link href="/">Back to Home</Link>
        </p>
      </div>
    </Layout>
  );
}
