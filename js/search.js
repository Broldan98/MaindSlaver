

const cards = [
  { name: "Charizard ex", game: "pokemon", rarity: "ultra", state: "nm", price: "$185", color: "#ff6030" },
  { name: "Black Lotus", game: "mtg", rarity: "secret", state: "lp", price: "$2,400", color: "#8060d0" },
  { name: "Blue-Eyes White Dragon", game: "yugioh", rarity: "rare", state: "nm", price: "$45", color: "#6090e0" },
  { name: "Pikachu VMAX", game: "pokemon", rarity: "ultra", state: "nm", price: "$95", color: "#f0c020" },
  { name: "Mox Sapphire", game: "mtg", rarity: "secret", state: "mp", price: "$1,100", color: "#4080c0" },
  { name: "Dark Magician", game: "yugioh", rarity: "rare", state: "lp", price: "$28", color: "#6040a0" },
  { name: "Mickey Mouse Brave", game: "lorcana", rarity: "uncommon", state: "nm", price: "$12", color: "#2080c0" },
  { name: "Roronoa Zoro", game: "op", rarity: "ultra", state: "nm", price: "$67", color: "#c03040" },
  { name: "Mewtwo ex", game: "pokemon", rarity: "secret", state: "nm", price: "$320", color: "#a050c0" },
  { name: "Lightning Bolt", game: "mtg", rarity: "uncommon", state: "lp", price: "$8", color: "#e06020" },
  { name: "Exodia the Forbidden", game: "yugioh", rarity: "ultra", state: "hp", price: "$55", color: "#804020" },
  { name: "Elsa Frozen Powers", game: "lorcana", rarity: "rare", state: "nm", price: "$35", color: "#40a0d0" },
  { name: "Monkey D. Luffy", game: "op", rarity: "secret", state: "nm", price: "$120", color: "#c03040" },
  { name: "Gengar VMAX", game: "pokemon", rarity: "rare", state: "lp", price: "$42", color: "#8040a0" },
  { name: "Sol Ring", game: "mtg", rarity: "uncommon", state: "nm", price: "$3", color: "#c09020" },
  { name: "Ash Ketchum Supporter", game: "pokemon", rarity: "common", state: "nm", price: "$2", color: "#e08020" },
  { name: "Pot of Greed", game: "yugioh", rarity: "common", state: "mp", price: "$5", color: "#608040" },
  { name: "Simba King", game: "lorcana", rarity: "uncommon", state: "lp", price: "$18", color: "#e09030" },
  { name: "Trafalgar Law", game: "op", rarity: "rare", state: "nm", price: "$38", color: "#3060c0" },
  { name: "Umbreon VMAX", game: "pokemon", rarity: "ultra", state: "nm", price: "$145", color: "#303060" },
  { name: "Counterspell", game: "mtg", rarity: "common", state: "lp", price: "$4", color: "#4060a0" },
  { name: "Mirror Force", game: "yugioh", rarity: "rare", state: "nm", price: "$15", color: "#a09060" },
  { name: "Moana Wayfinder", game: "lorcana", rarity: "rare", state: "nm", price: "$22", color: "#2090a0" },
  { name: "Nami Navigator", game: "op", rarity: "uncommon", state: "lp", price: "$14", color: "#e08030" },
];

const rarityLabels = { common: "Común", uncommon: "Poco Común", rare: "Rara", ultra: "Ultra Rara", secret: "Secreta" };
const rarityIcons = { common: "⚪", uncommon: "🟢", rare: "🔵", ultra: "🟣", secret: "⭐" };
const gameBadgeClass = { pokemon: "badge-pokemon", mtg: "badge-mtg", yugioh: "badge-yugioh", lorcana: "badge-lorcana", op: "badge-op" };
const gameLabelMap = { pokemon: "Pokémon", mtg: "MTG", yugioh: "Yu-Gi-Oh", lorcana: "Lorcana", op: "One Piece" };
const stateClass = { nm: "state-nm", lp: "state-lp", mp: "state-mp", hp: "state-hp" };

let activeFilters = { game: "all", rarity: "all", state: "all" };


function renderCards(list) {
  const grid = document.getElementById('cards-grid');
  if (!grid) return;
  document.getElementById('result-count').textContent = list.length;
  grid.innerHTML = list.map((c, i) => `
    <div class="card-item" style="animation-delay:${i * 0.04}s">
      <div class="card-image" style="background: linear-gradient(135deg, ${c.color}22, ${c.color}44)">
        <div class="card-game-badge ${gameBadgeClass[c.game]}">${gameLabelMap[c.game]}</div>
        <div class="card-rarity-icon">${rarityIcons[c.rarity]}</div>
      </div>
      <div class="card-info">
        <div class="card-name">${c.name}</div>
        <div class="card-meta">
          <span class="card-state ${stateClass[c.state]}">${c.state.toUpperCase()}</span>
          <span class="card-rarity">${rarityLabels[c.rarity]}</span>
        </div>
        <div class="card-footer">
          <div class="card-price">${c.price}</div>
          <button class="btn-trade">Intercambiar</button>
        </div>
      </div>
    </div>
  `).join('');
}

function filterCards() {
  const query = (document.getElementById('search-input')?.value || '').toLowerCase();
  const filtered = cards.filter(c => {
    const matchGame = activeFilters.game === 'all' || c.game === activeFilters.game;
    const matchRarity = activeFilters.rarity === 'all' || c.rarity === activeFilters.rarity;
    const matchState = activeFilters.state === 'all' || c.state === activeFilters.state;
    const matchQuery = !query || c.name.toLowerCase().includes(query);
    return matchGame && matchRarity && matchState && matchQuery;
  });
  renderCards(filtered);
}

function toggleChip(el, type) {
  const container = el.closest('.filter-chips');
  container.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  if (type === 'game') activeFilters.game = el.dataset.game;
  if (type === 'rarity') activeFilters.rarity = el.dataset.rarity;
  if (type === 'state') activeFilters.state = el.dataset.state;
  filterCards();
}

function clearFilters() {
  activeFilters = { game: 'all', rarity: 'all', state: 'all' };
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
  document.querySelectorAll('.filter-chips').forEach(group => {
    group.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    group.querySelector('.chip').classList.add('active');
  });
  filterCards();
}
