import Link from 'next/link';
import Layout from '../components/Layout';

export default function Rules() {
  return (
    <Layout>
 
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 roboto">
        <div className="bg-white shadow-md rounded p-6">
          <h1 className="text-3xl font-bold mb-4">Culture Wars Game Mechanics</h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold">What do you need to Play?</h2>

            <ul className="list-none pl-4">
                  <li>At least 1D6, preferably 1 per player</li>
                  <li>3+ sapient organisms</li>
                  <li>The cards</li>
                  <li>A way to keep track of Supremacy points for each player</li>
            </ul>

          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Objective:</h2>
            <p>
              Players equip their avatars to engage in one-on-one combat, aiming to accumulate Supremacy Points. Achieving a <b>10</b> Supremacy Points allows a player to declare "Final Supremacy" and win the game.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold">Card Types:</h2>
            <ul className="list-none pl-4">
              <li><b>Avatars</b>: Characters used by players for combat. Each avatar can be equipped with up to three Bonus cards, but only one can be a WEAPON. Players can swap out bonuses during their turn.</li>
              <li><b>Bonus Deck</b>: This deck includes Equipment, Weapons, and Instants. These cards are either attached to avatars or held in hand for strategic single-use during combat.</li>
              <li><b>Battlefields</b>: These cards define the combat area, each offering unique bonuses or negatives that affect the battle.</li>
              <li><b>Equipment</b>: Each player is provided with a six-sided die for combat purposes.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold">Game Setup:</h2>
            <ul className="list-none pl-4">
              <li><b>Avatar Selection</b>: Players randomly select an avatar card from the avatar deck. This character represents the player in the game.</li>
              <li><b>Battlefield Draw</b>: Players draw a battlefield card to determine the combat arena. Battlefields change with each full cycle of player turns.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold">Player Turn:</h2>
            <ul className="list-none pl-4">
              <li><b>Draw Phase</b>: Draw a card from the Bonus Deck at the start of your turn.</li>
              <li><b>Action Phase</b>: Perform two of the following actions (can repeat an action):
                <ul className="list-none pl-4">
                  <li>1<b>Equip</b>: Play a card from your hand to your avatar.</li>
                  <li>2<b>Loot</b>: Draw an additional card from the Bonus Deck.</li>
                  <li>3<b>Combat</b>: Engage in combat with another player's avatar.</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold">Combat Mechanics:</h2>
            <ul className="list-none pl-4">
              <li>Players roll a die and add the result to their avatar's total power (including bonuses, inherent value, battlefield effects).</li>
              <li>The player with the higher power score wins, earning one Supremacy Point.</li>
              <li>The losing avatar must discard an attached card. If unable, they are considered "Found Out" and immune to attack until the next cycle.</li>
              <li>Ties result in the defender winning.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold">Avatar Example:</h2>
            <p>
              Avatar: Soccer Mom on a Fistful of Xanax (Power 4)<br />
              Bonuses: Pinot Noir Bottle (+1), Trust Fund (+1), Cancelled (-1)<br />
              Battlefield: Nanking Children’s Hospital (+1 to attacker)<br />
              Total Power: 6 + roll of 1d6
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold">Avatar Statuses</h2>
            <p>All Avatars begin the game in the Basic B1tch status. As a Battleground changes or an item is equipped, statuses will alter the rolls of your Avatar. If no status is mentioned on the current battleground and no items are affecting your character, you are considered a Basic B1tch </p>
            <p>
            <b>Basic B1tch</b>: No status effects<br />
            <b>Cringe</b>: -1 to all rolls<br />
            <b>Amped</b>: +2 to all rolls, Win ties<br />
            <b>Chill</b>: +1 to all rolls<br />
            <b>Enraged</b>: -2 to all rolls<br />
            <b>Salty</b>: Reroll all dice and be forced to choose the lesser of the 2 as the result<br />
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold">Game Dynamics:</h2>
            <p>
              The game is designed for fluctuating power levels, allowing for unpredictable combat outcomes. 
              Adjustments like using a ten-sided die (d10) can be considered for balancing. Or just alter the rules completely. 
              This is a tabletop game meant to be shared with friend you would feel comfortable mocking in the most offensive way possible.
            </p>
          </div>


        <p className="mt-8">
          <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="/">Back to Home</Link>
        </p>
      </div>
    </div>
    </Layout>
  );
}
