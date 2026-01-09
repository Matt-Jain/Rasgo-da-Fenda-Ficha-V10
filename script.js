let player=""
let characters=[]
let tempChar={}
let points=200

const skills=[
"Luta Corpo a Corpo","Armas Brancas","Armas de Fogo","Esquiva",
"Percepção","Investigação","Ocultismo","Intuição",
"Atletismo","Furtividade","Resistência",
"Persuasão","Enganação","Intimidação","Empatia",
"Acrobacia","Conhecimento","Diplomacia"
]

function enterApp(){
 player=document.getElementById("playerNameLogin").value
 if(!player) return alert("Digite seu nome")
 openScreen("menuScreen")
}

function openScreen(id){
 document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"))
 document.getElementById(id).classList.add("active")
}

function goToSkills(){
 tempChar={
  name:charName.value,
  player:playerName.value,
  race:race.value,
  appearance:appearance.value,
  history:history.value,
  skills:{}
 }
 points=200
 skills.forEach(s=>tempChar.skills[s]=20)
 renderSkills()
 openScreen("skillsScreen")
}

function renderSkills(){
 const list=document.getElementById("skillsList")
 list.innerHTML=""
 skills.forEach(s=>{
  const div=document.createElement("div")
  div.className="skill"
  div.innerHTML=`
   <span>${s}</span>
   <button onclick="changeSkill('${s}',-5)">-</button>
   <b>${tempChar.skills[s]}</b>
   <button onclick="changeSkill('${s}',5)">+</button>
  `
  list.appendChild(div)
 })
 pointsLeft.innerText="Pontos restantes: "+points
}

function changeSkill(skill,val){
 if(points-val<0||tempChar.skills[skill]+val<0) return
 tempChar.skills[skill]+=val
 points-=val
 renderSkills()
}

function finishCharacter(){
 characters.push({...tempChar})
 renderCharacters()
 openScreen("menuScreen")
}

function renderCharacters(){
 const list=document.getElementById("charactersList")
 list.innerHTML=""
 characters.forEach((c,i)=>{
  const div=document.createElement("div")
  div.className="skill"
  div.innerHTML=`${c.name} (${c.race})`
  list.appendChild(div)
 })
}

function rollDice(){
 const skill=diceSkill.value
 const char=characters[0]
 if(!char) return alert("Crie um personagem")
 diceAnimation.style.display="block"
 diceResult.innerText=""
 setTimeout(()=>{
  diceAnimation.style.display="none"
  const r=Math.floor(Math.random()*100)+1
  const v=char.skills[skill]
  let res="Fracasso",color="#c62828"
  if(r<=v/5){res="Extremo";color="#00e5ff"}
  else if(r<=v){res="Sucesso";color="#76ff03"}
  diceResult.style.color=color
  diceResult.innerText=`${r}/${v} → ${res}`
 },1200)
}

function updateDiceSkills(){
 diceSkill.innerHTML=""
 skills.forEach(s=>{
  const o=document.createElement("option")
  o.textContent=s
  diceSkill.appendChild(o)
 })
}
updateDiceSkills()
