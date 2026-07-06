const resultName = document.getElementById("characterName");
const resultImage = document.getElementById("characterImg");
const resultDescription = document.getElementById("resultDescript");
const chanceText = document.getElementById("chanceText");
const rarityText = document.getElementById("rarityText");
const rollButton = document.getElementById("rollButton");
const autorollCheck = document.getElementById("autoRollCheck");
const inventoryButton = document.getElementById("inventoryButton");
const inventoryModal = document.getElementById("inventoryModal");
const inventoryContent = document.getElementById("inventoryContent");
const inventoryGrid = document.getElementById("inventoryGrid");
const inventoryClose = document.getElementsByClassName("closeButton")[0];
const charInfo = document.getElementById("characterInfo");
const backButton = document.getElementsByClassName("backButton")[0];
const charInfoName = document.getElementById("charInfoName");
const charInfoImage = document.getElementById("charInfoImg");
const charInfoDescript = document.getElementById("charInfoDescript");
const charInfoChance = document.getElementById("charInfoChance");
const charInfoRarity = document.getElementById("charInfoRarity");
const charInfoClose = document.getElementsByClassName("closeButton")[1];
const infoButton = document.getElementById("infoButton");
const infoModal = document.getElementById("infoModal");
const infoClose = document.getElementsByClassName("closeButton")[2];
const colorCheck = document.getElementById("colorCheck");

let inventory = JSON.parse(localStorage.getItem('saved-inventory')) || {};

let rolling = false;
let autoroll = false;
let autoRollInterval;
let colorsOff = false;
let currentChar = 0;

function load_character_info(charValue) {
  charInfoName.innerText = char_database[charValue][0];
  charInfoImage.src = char_database[charValue][1];
  charInfoDescript.innerText = char_database[charValue][2];
  charInfoChance.innerText = `1 in ${char_database[charValue][3]}`;
  charInfoRarity.innerText = `(${char_database[charValue][4]})`;
  if (colorsOff) {
    charInfoChance.style.color = "var(--colors-off)";
    charInfoRarity.style.color = "var(--colors-off)";
  }
  else {
    if (char_database[charValue][4] == "Common") {
      charInfoChance.style.color = "var(--common-color)";
      charInfoRarity.style.color = "var(--common-color)";
    }
    else if (char_database[charValue][4] == "Uncommon") {
      charInfoChance.style.color = "var(--uncommon-color)";
      charInfoRarity.style.color = "var(--uncommon-color)";
    }
    else if (char_database[charValue][4] == "Rare") {
      charInfoChance.style.color = "var(--rare-color)";
      charInfoRarity.style.color = "var(--rare-color)";
    }
    else if (char_database[charValue][4] == "Exotic") {
      charInfoChance.style.color = "var(--exotic-color)";
      charInfoRarity.style.color = "var(--exotic-color)";
    }
    else if (char_database[charValue][4] == "Legendary") {
      charInfoChance.style.color = "var(--legendary-color)";
      charInfoRarity.style.color = "var(--legendary-color)";
    }
    else if (char_database[charValue][4] == "Super") {
      charInfoChance.style.color = "var(--super-color)";
      charInfoRarity.style.color = "var(--super-color)";
    }
  }
}

function open_info(id) {
  inventoryContent.style.display = 'none';
  charInfo.style.display = 'grid';
  load_character_info(id);
}

function add_to_inventory(id) {
  let count = (+inventory[id] || 0) + 1;
  inventory[id] = count;
  localStorage.setItem('saved-inventory', JSON.stringify(inventory));
}

function write_inventory() {
  inventoryGrid.innerHTML = "";
  for (const [character, count] of Object.entries(inventory)) {
    const charButton = document.createElement('button');
    const rarityAbbr = document.createElement('span');
    charButton.className = "inventoryButton";
    
    charButton.innerHTML = `<img src=${char_database[character][1]} height=100/><br/>
          ${char_database[character][0]}`;
    
    charButton.append(rarityAbbr);
    rarityAbbr.className = "rarityAbbr";
    
    if (char_database[character][4] == "Common") {
      if (colorsOff) {
        charButton.classList.add("uncodedButton");
      }
      else {
        charButton.classList.add("commonButton");
      }
      rarityAbbr.innerText = "C";
    }
    else if (char_database[character][4] == "Uncommon") {
      if (colorsOff) {
        charButton.classList.add("uncodedButton");
      }
      else {
        charButton.classList.add("uncommonButton");
      }
      rarityAbbr.innerText = "U";
    }
    else if (char_database[character][4] == "Rare") {
      if (colorsOff) {
        charButton.classList.add("uncodedButton");
      }
      else {
        charButton.classList.add("rareButton");
      }
      rarityAbbr.innerText = "R";
    }
    else if (char_database[character][4] == "Exotic") {
      if (colorsOff) {
        charButton.classList.add("uncodedButton");
      }
      else {
        charButton.classList.add("exoticButton");
      }
      rarityAbbr.innerText = "E";
    }
    else if (char_database[character][4] == "Legendary") {
      if (colorsOff) {
        charButton.classList.add("uncodedButton");
      }
      else {
        charButton.classList.add("legendaryButton");
      }
      rarityAbbr.innerText = "L";
    }
    else if (char_database[character][4] == "Super") {
      if (colorsOff) {
        charButton.classList.add("uncodedButton");
      }
      else {
        charButton.classList.add("superButton");
      }
      rarityAbbr.innerText = "S";
    }
    
    if (count > 1) {
      const formattedCount = Intl.NumberFormat('en-US', {
        notation: "compact",
        maximumFractionDigits: 2
      }).format(count);
      const counter = document.createElement('span');
      counter.className = "itemCount";
      counter.innerHTML = `&times;${formattedCount}`;
      charButton.append(counter);
    }
    
    charButton.id = character;
    charButton.onclick = function() { 
      open_info(this.id);
    };
    
    inventoryGrid.append(charButton);
  }
}

function change_colors() {
  if (colorsOff) {
    chanceText.style.color = "var(--colors-off)";
    rarityText.style.color = "var(--colors-off)";
  }
  else {
    if (char_database[currentChar][4] == "Common") {
    chanceText.style.color = "var(--common-color)";
    rarityText.style.color = "var(--common-color)";
    }
    else if (char_database[currentChar][4] == "Uncommon") {
      chanceText.style.color = "var(--uncommon-color)";
      rarityText.style.color = "var(--uncommon-color)";
    }
    else if (char_database[currentChar][4] == "Rare") {
      chanceText.style.color = "var(--rare-color)";
      rarityText.style.color = "var(--rare-color)";
    }
    else if (char_database[currentChar][4] == "Exotic") {
      chanceText.style.color = "var(--exotic-color)";
      rarityText.style.color = "var(--exotic-color)";
    }
    else if (char_database[currentChar][4] == "Legendary") {
      chanceText.style.color = "var(--legendary-color)";
      rarityText.style.color = "var(--legendary-color)";
    }
    else if (char_database[currentChar][4] == "Super") {
      chanceText.style.color = "var(--super-color)";
      rarityText.style.color = "var(--super-color)";
    }
  }
}

function load_character_result(charValue) {
  characterName.innerText = char_database[charValue][0];
  resultImage.src = char_database[charValue][1];
  resultDescription.innerText = char_database[charValue][2];
  chanceText.innerText = `1 in ${char_database[charValue][3]}`;
  rarityText.innerText = `(${char_database[charValue][4]})`;
  change_colors();
}

function roll_character() {
  let totalWeight = 0;
  const weights = char_database.map(char => {
    const weight = 1 / char[3];
    totalWeight += weight;
    return weight;
  });

  const randomNum = Math.random() * totalWeight;
  let weightSum = 0;

  for (let i = 0; i < char_database.length; i++) {
    weightSum += weights[i];
    if (randomNum <= weightSum) {
      return i;
    }
  }

  return 0;
}

function roll_animation() {
    if (rolling) return;
    
    rolling = true;
    rollButton.disabled = true;
    
    let duration = 5000;
    let interval = 50;
    let startTime = Date.now();

    function frame() {
        let elapsedTime = Date.now() - startTime;
        if (elapsedTime < duration) {
            currentChar = roll_character();
            load_character_result(currentChar);
            setTimeout(frame, interval);
            interval = Math.min(interval * 1.1, 500);
        } else {
            finish_roll(currentChar);
        }
    }

    frame();
}

function finish_roll(result) {
  load_character_result(result);
  add_to_inventory(result);
  write_inventory();
  rolling = false;
  if (!autoroll) {
    rollButton.disabled = false;
  }
}

function toggle_autoroll() {
  if (autorollCheck.checked) {
    autoroll = true;
    autorollInterval = setInterval(roll_animation, 3500);
  } else {
    autoroll = false;
    if (!rolling) {
      rollButton.disabled = false;
    }
    clearInterval(autorollInterval);
  }
}

function toggle_colors() {
  if (colorCheck.checked) {
    colorsOff = true;
    change_colors();
  } else {
    colorsOff = false;
    change_colors();
  }
}

rollButton.addEventListener("click", roll_animation);
autorollCheck.addEventListener("change", toggle_autoroll);
inventoryButton.addEventListener('click', () => {
    write_inventory();
    inventoryModal.style.display = 'block';
    inventoryContent.style.display = 'block';
    charInfo.style.display = 'none';
});
inventoryClose.addEventListener('click', () => {
    inventoryModal.style.display = 'none';
});
backButton.addEventListener('click', () => {
    inventoryContent.style.display = 'block';
    charInfo.style.display = 'none';
});
charInfoClose.addEventListener('click', () => {
    inventoryModal.style.display = 'none';
});
infoButton.addEventListener('click', () => {
    infoModal.style.display = 'block';
});
infoClose.addEventListener('click', () => {
    infoModal.style.display = 'none';
});
window.addEventListener('click', (event) => {
  if (event.target == inventoryModal) {
    inventoryModal.style.display = 'none';
  }
  else if (event.target === infoModal) {
      infoModal.style.display = 'none';
  }
});
colorCheck.addEventListener("change", toggle_colors);