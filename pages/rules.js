import Link from 'next/link';
import Layout from '../components/Layout';

export default function Rules() {
  return (
    <Layout>
 
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl font-extrabold text-center text-gray-900 sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl mt-10 mb-8">Game Rules</h1>

    <div class="text-lg leading-relaxed text-gray-700 space-y-6">

        <h2 class="text-3xl font-semibold mt-10 mb-4">Objective</h2>
        <p>The objective of Culture Wars is to mock, ridicule, and outwit your opponent in a satirical battle of wits and cultural references.</p>

        <h2 class="text-3xl font-semibold mt-10 mb-4">Components</h2>
        <ul class="list-none pl-8 space-y-2">
            <li>Deck of Cards: Create a deck of culture-themed cards, including pop culture references, memes, famous personalities, and absurd situations.</li>
            <li>Player Tokens: Each player starts with a certain number of tokens (e.g., Sarcasm Tokens) representing their wit or mockery power.</li>
            <li>Play Area: Set up a playmat or play area where players will place their cards.</li>
        </ul>

        <h2 class="text-3xl font-semibold mt-10 mb-4">Setup</h2>
        <p>Each player starts with a shuffled deck of Culture Wars cards.</p>
        <p>Both players begin with a fixed number of Sarcasm Tokens, say 20.</p>

        <h2 class="text-3xl font-semibold mt-10 mb-4">Gameplay</h2>

        <h3 class="text-2xl font-medium mt-8 mb-2">Draw Phase</h3>
        <p>At the start of your turn, draw one card from your deck.</p>

        <h3 class="text-2xl font-medium mt-8 mb-2">Main Phase</h3>
        <ul class="list-none pl-8 space-y-2">
            <li>Play Cards: You can play one card from your hand during your main phase. Each card has a cost in Sarcasm Tokens.</li>
            <li>Activate Abilities: Some cards may have special abilities that you can activate during your turn.</li>
        </ul>

        <h3 class="text-2xl font-medium mt-8 mb-2">Battle Phase</h3>
        <p>If you have any Attack cards in play, you can declare an attack against your opponent.</p>
        <p>Opponent can play Defense cards or use special abilities to defend against the attack.</p>
        <p>Calculate the damage dealt, and deduct Sarcasm Tokens from your opponent's total.</p>

        <p class="text-xl mt-8 mb-4">End Phase: End your turn.</p>

        <h2 class="text-3xl font-semibold mt-10 mb-4">Card Types</h2>
        <ul class="list-none pl-8 space-y-2">
            <li>Character Cards: These represent cultural references, personalities, or fictional characters. They have attack and defense stats.</li>
            <li>Event Cards: These cards introduce absurd situations or events that affect the game, such as Internet Outage or Alien Invasion.</li>
            <li>Meme Cards: These cards may have humorous effects or reference internet memes.</li>
            <li>Artifact Cards: Powerful items or artifacts that can enhance your characters or abilities.</li>
            <li>Instant Cards: Can be played at any time, even during your opponent's turn, to disrupt their plans or enhance your own.</li>
        </ul>

        <h2 class="text-3xl font-semibold mt-10 mb-4">Winning</h2>
        <p>The game continues until one player's Sarcasm Tokens reach zero or below. The player with the most Sarcasm Tokens left wins the Culture Wars.</p>

    </div>


        <p className="mt-8">
          <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="/">Back to Home</Link>
        </p>
      </div>
    </Layout>
  );
}
