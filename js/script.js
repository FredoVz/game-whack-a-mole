const tanah = document.querySelectorAll(".tanah");
const tikus = document.querySelectorAll(".tikus");
const papanSkor = document.querySelector(".papan-skor");
const papanWaktu = document.querySelector(".papan-waktu");
const pop = document.querySelector("#pop");

let tanahSebelumnya;
let selesai = true; //gameAktif atau tidak
let skor = 0;

function randomTanah(tanah) {
  const t = Math.floor(Math.random() * tanah.length);
  const tRandom = tanah[t];
  if (tRandom == tanahSebelumnya) {
    return randomTanah(tanah);
  }
  tanahSebelumnya = tRandom;
  return tRandom;
}

function randomWaktu(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function munculkanTikus() {
  const tRandom = randomTanah(tanah);
  const wRandom = randomWaktu(300, 1000);
  tRandom.classList.add("muncul");

  setTimeout(() => {
    tRandom.classList.remove("muncul");
    if (!selesai) {
      munculkanTikus();
    }
  }, wRandom);
}

function mulai() {
  selesai = false;
  skor = 0;
  let waktu = 10; // waktu game dalam detik
  papanSkor.textContent = 0;
  papanWaktu.textContent = waktu;
  munculkanTikus();
  /*setTimeout(() => {
        selesai = true;
    }, 10000);*/

  // timer countdown
  const countdown = setInterval(() => {
    waktu--;
    papanWaktu.textContent = waktu;

    if (waktu <= 0) {
      clearInterval(countdown);
      selesai = true;
    }
  }, 1000);
}

function pukul() {
  if (selesai) return; // mencegah klik saat game belum mulai

  skor++;
  this.parentNode.classList.remove("muncul");
  pop.play();
  papanSkor.textContent = skor;
}

tikus.forEach((t) => {
  t.addEventListener("click", pukul);
});
