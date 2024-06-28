import CharacterForm from "@/components/character-form";
import { createCharacter } from "../../../actions/charactersActions";

export default function Page() {
  return (
    <div>
      <h2>Create your character</h2>
      <CharacterForm
        formAction={createCharacter}
        initialData={{ name: "", nickname: "" }}
      ></CharacterForm>
    </div>
  );
}
