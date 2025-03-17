import { CommonInventoryBench } from "./CommonInventoryBench";
import {useCharacter} from "../../../store/storeHooks";

const PotionInventory = () => {
    const { character } = useCharacter();

    return <CommonInventoryBench
        title="Potion Inventory"
        items={character.inventory.potions}
        type="potion"
    />
}

export { PotionInventory };
