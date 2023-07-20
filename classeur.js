// conteneur de projet
let conteneur = document.getElementById("conteneur")
let accordion = document.getElementById('accordionExample');
let i = 0;

if(accordion.children.length == 0){
	accordion.classList.add('text-center', 'fst-italic', 'text-muted')
	accordion.innerText = "Pas de projet";
}

function ajouter(){

	if(accordion.innerText == "Pas de projet"){
	accordion.innerText = ""
	accordion.classList.remove('text-center', 'fst-italic')
	}

	let accordionItem = document.createElement('div');
	accordionItem.classList.add('accordion-item');

	let titre = document.createElement('h2');
	titre.classList.add('accordion-header');
	titre.id = "heading"+i

	// Bouton de l'accordion
	let button = document.createElement('button');
	button.classList.add('accordion-button','row','mx-0');
	button.setAttribute('type', 'button');
	button.setAttribute('data-bs-toggle', "collapse");
	button.setAttribute("data-bs-target", "#collapse"+i);
	button.setAttribute("aria-expanded", "true");
	button.setAttribute("aria-controls", "collapse"+i);
	// Contenu du bouton
	let accordionName = document.createElement('span');
	let accordionBtnListe = document.createElement('span');
	let accordionBtnAdd = document.createElement('button');
	let accordionBtnRemove = document.createElement('button');
	let accordionBtnSet = document.createElement('button');

	accordionName.classList.add('py-1','col-12','col-md-4','fst-italic','text-muted','titre');
	// accordionName.style.width = '35%'
	accordionBtnListe.classList.add('mx-md-auto','col-10','col-md-7');
	// accordionBtnListe.style.width = '60%'
	accordionBtnAdd.classList.add('col','btn','mx-md-2','ajouter_auteur');
	accordionBtnAdd.style.padding = "1rem 0.5rem";
	accordionBtnRemove.classList.add('col','btn','mx-md-2','supprimer_auteur');
	accordionBtnRemove.style.padding = "1rem 0.5rem";
	accordionBtnSet.classList.add('col','btn','mx-md-2','modifier_auteur');
	accordionBtnSet.style.padding = "1rem 0.5rem";

	accordionBtnAdd.setAttribute('type','button')
	accordionBtnRemove.setAttribute('type','button')
	accordionBtnSet.setAttribute('type','button')

	accordionName.innerText = "Définir le nom en cliquant sur Modifier";
	accordionBtnAdd.innerText = "Ajouter";
	accordionBtnRemove.innerText = "Supprimer";
	accordionBtnSet.innerText = "Modifier";

	accordionBtnAdd.addEventListener('click', add_projet)
	accordionBtnRemove.addEventListener('click', remove_author);
	accordionBtnSet.addEventListener('click', set_author);

	accordionBtnListe.appendChild(accordionBtnAdd);
	accordionBtnListe.appendChild(accordionBtnSet);
	accordionBtnListe.appendChild(accordionBtnRemove);

	button.appendChild(accordionName)
	button.appendChild(accordionBtnListe)
	 
	let link = document.createElement('div');
	link.id = "collapse"+i;
	link.classList.add('accordion-collapse','collapse','show');
	link.setAttribute("aria-labelledby", 'heading'+i);
	link.setAttribute("data-bs-parent", "#accordionExample");
	// Liste de projet(s)
	let projet = document.createElement('ul');

	projet.classList.add("accordion-body");

	titre.appendChild(button);

	link.appendChild(projet);

	accordionItem.appendChild(titre);
	accordionItem.appendChild(link);

	accordion.appendChild(accordionItem);

	i++;
}	

// fonction pour supprimer un auteur de projet(s)
function remove_author(e){
	accordionItem = e.target.parentNode.parentNode.parentNode.parentNode
	accordionItem.remove()	

}
// fonction pour modifier un auteur de projet(s)
function set_author(e){
	let accordionBTN = e.target.parentNode.parentNode;
	let nomProjet = accordionBTN.firstChild
	nomProjet.classList.add('text-capitalize')
	nomProjet.classList.remove('fst-italic','text-muted')
	let actuelNom = nomProjet.innerText
	let nouveauNom = prompt("Modifiez le nom", actuelNom);
	console.log(typeof(nouveauNom))
	// if(nouveauNom !== ""){
	// 	nomProjet.innerText= nouveauNom;
	// }
	if(nouveauNom === null){
		nomProjet.innerText = actuelNom;
	}
	else if(nouveauNom !== ""){
	 	nomProjet.innerText = nouveauNom;
	}
	 else{
	 	nomProjet.innerText = actuelNom;
	 }
	
}

// fonction pour ajouter un projet
function add_projet(e){
	let titre = e.target.parentNode.parentNode.parentNode;
	let accordionItem = titre.parentNode;
	let link = accordionItem.children[1];
	let projet = link.children[0]

	//Déclaration des variables
	const newProjet = document.createElement('li');

	let nomProjet = document.createElement('span');
	let urlProjet = document.createElement('span');
	let btnActionConteneur = document.createElement('span');
	// Conteneur de l'url
	let lien = document.createElement('a');
	// Verification de l'url saisie
	let pattern = /^(ftp|http|https):\/\/[^ "]+$/;
	let projetNom = prompt("Veuillez enter le nom du projet");
	let projetURL = prompt("Veuillez entrer le lien du site");
	//Boutons...action
	let btnDeleteProjet = document.createElement('button');
	let btnSetProjet = document.createElement('button');

	newProjet.classList.add('row', 'd-flex', 'border-bottom', 'py-3', 'projets', 'my-2', 'my-md-0');
	nomProjet.classList.add('col-5','col-md-3','py-1','fs-5','overflow-hidden','text-wrap');
	urlProjet.classList.add('col-7','col-md-6','py-1','fs-5','overflow-hidden','text-wrap');
	btnActionConteneur.classList.add('col-12','col-md-3','d-flex');
	btnDeleteProjet.classList.add('col','btn','mx-2', 'supprimer_projet')
	btnSetProjet.classList.add('col','btn','mx-2', 'modifier_projet')

	btnDeleteProjet.setAttribute('type', 'button');
	btnSetProjet.setAttribute('type', 'button');

	btnDeleteProjet.innerText = "Del"
	btnSetProjet.innerText = "Set"

	btnDeleteProjet.addEventListener('click', remove_projet)
	btnSetProjet.addEventListener('click', set_projet)

	nomProjet.innerText = projetNom;
	if(pattern.test(projetURL)){
		lien.innerText = projetURL;
		lien.setAttribute('href', projetURL);
		lien.setAttribute('target', '_blank');
	}else{
		alert("L'url n'est pas valide!");
	}

	btnActionConteneur.appendChild(btnDeleteProjet)
	btnActionConteneur.appendChild(btnSetProjet)	

	urlProjet.appendChild(lien);

	newProjet.appendChild(nomProjet);
	newProjet.appendChild(urlProjet);
	newProjet.appendChild(btnActionConteneur);

	projet.appendChild(newProjet);
}
// fonction pour modifier un projet
function set_projet(e){
	let item = e.target.parentNode.parentNode;
	let nomProjet = item.firstChild;
	let actuelNom = nomProjet.innerText
	let nouveauNom = prompt('Entrez un nouveau nom', actuelNom);

	if(nouveauNom === null){
		nomProjet.innerText = actuelNom;
	}
	else if(nouveauNom !== ""){
	 	nomProjet.innerText = nouveauNom;
	}
	 else{
	 	nomProjet.innerText = actuelNom;
	 }

}
// fonction pour supprimer un projet
function remove_projet(e){
	let item = e.target.parentNode.parentNode;
	let reponse = confirm(" Êtes vous sûr de vouloir supprimer cet élément?")
	console.log(reponse)
	console.log(typeof(reponse))
	if(reponse === true){
		item.remove()
	}
}