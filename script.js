// ====== EDIT THESE: client's pricing and contact ======
const WHATSAPP = "254729757966";
const BASE = { studio: 8000, "1br": 12000, "2br": 18000, "3br": 26000, "4br": 36000, officeS: 22000, officeL: 45000 };
const FREE_KM = 10;        // distance included in base price
const PER_KM = 120;        // KSh per extra km
const PER_FLOOR = 1000;    // KSh per floor without a lift
const PACKING = 0.30;      // packing adds 30% of base
const RANGE = 0.15;        // +/- 15% shown as a range
// ======================================================
const $ = s => document.querySelector(s);
const fmt = n => "KSh " + (Math.round(n / 100) * 100).toLocaleString();
const label = () => $("#size").selectedOptions[0].text;

function calc() {
  const km = +$("#km").value, floors = Math.max(0, +$("#floors").value || 0);
  let t = BASE[$("#size").value] + Math.max(0, km - FREE_KM) * PER_KM + floors * PER_FLOOR;
  if ($("#pack").checked) t += BASE[$("#size").value] * PACKING;
  const lo = t * (1 - RANGE), hi = t * (1 + RANGE);
  $("#kmOut").textContent = km + " km";
  $("#result").innerHTML = `<small>Estimated price</small><strong>${fmt(lo)} to ${fmt(hi)}</strong><small>Final quote confirmed after we check your inventory and access.</small>`;
  const msg = [
    "Hello Ken Movers, I would like a moving quote.",
    $("#name").value && `Name: ${$("#name").value}`,
    `Move: ${label()}`,
    $("#from").value && `From: ${$("#from").value}`,
    $("#to").value && `To: ${$("#to").value}`,
    `Distance: about ${km} km`,
    `Floors without lift: ${floors}`,
    `Packing: ${$("#pack").checked ? "Yes" : "No"}`,
    $("#date").value && `Date: ${$("#date").value}`,
    `Estimate shown: ${fmt(lo)} to ${fmt(hi)}`
  ].filter(Boolean).join("\n");
  $("#send").href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}
document.querySelectorAll("#estForm input,#estForm select").forEach(el => el.addEventListener("input", calc));
$("#estForm").addEventListener("submit", e => e.preventDefault());
const hello = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hello Ken Movers, I need help with a move.")}`;
$("#waHero").href = hello; $("#waFloat").href = hello;
$("#burger").onclick = () => { const o = $("#menu").classList.toggle("open"); $("#burger").setAttribute("aria-expanded", o); };
$("#menu").addEventListener("click", () => $("#menu").classList.remove("open"));
$("#date").min = new Date().toISOString().split("T")[0];
$("#yr").textContent = new Date().getFullYear();
calc();
