import { getCharacters } from "../../actions/charactersActions";

export default async function CharactersList() {
  const characters = await getCharacters();

  return (
    <>
      {characters.map((character) => (
        <div>
          <h5>{character.nickname}</h5>
        </div>
      ))}
    </>
  );
}
