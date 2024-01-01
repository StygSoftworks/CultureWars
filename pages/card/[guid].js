import Layout from '../../components/Layout';

// Function to fetch data. This can be outside the component.
const fetchCardData = async (guid) => {
  //console.log(`/api/getCardByGuid?guid=${guid}`);
  //console.log(guid);

  const urlDataJson = `${process.env.BASE_URL}/api/getCardByGuid?guid=${guid}`;
  console.log(urlDataJson);

  const response = await fetch(`${process.env.BASE_URL}/api/getCardByGuid?guid=${guid}`);
  if (!response.ok) {
    //console.log(response);
    throw new Error('Failed to fetch data');
  }
  return response.json();
};



const CardDetail = ({ cardData, error }) => {
  if (error) {
    console.error(error);
    return <div>{error}</div>;
  }

  if (!cardData) {
    return <div>Loading...</div>;
  }

  // Render your card details here
  return (
    <Layout>
    <div className="max-w-sm bg-white rounded-lg overflow-hidden shadow-lg mx-auto mt-10">
      <img src={cardData.image} alt={cardData.name} className="w-full" />

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{cardData.name}</div>
        <p className="text-gray-700 text-base">{cardData.description}</p>
      </div>

      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          Type: {cardData.type}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          Subtype: {cardData.subtype}
        </span>
      </div>

      <div className="px-6 py-4">
        <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-800 mr-2">
          Attack: {cardData.attack}
        </span>
        <span className="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-red-800 mr-2">
          Defense: {cardData.defense}
        </span>
        <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2">
          Cost: {cardData.cost}
        </span>
      </div>

      <div className="px-6 py-4">
        <p className="text-gray-700 text-base">
          Abilities:
        </p>
        <ul className="list-disc ml-6">
          {cardData.abilities.map((ability, index) => (
            <li key={index} className="text-gray-600">{ability}</li>
          ))}
        </ul>
      </div>
    </div>
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const { guid } = context.params; // Extract the 'guid' parameter
    const data = await fetchCardData(guid);
    return { props: { cardData: data } };
  } catch (error) {
    return { props: { error: error.message } };
  }
};


export default CardDetail;
