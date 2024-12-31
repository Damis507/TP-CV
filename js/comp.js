document.getElementById('compForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nom = document.getElementById('nom').value;
    const description = document.getElementById('description').value;
    const niveau = document.getElementById('niveau').value;
    
    ajouterCompetence(nom, description, niveau);
    this.reset();
});

function ajouterCompetence(nom, description, niveau) {
    let competences = JSON.parse(localStorage.getItem('competences')) || [];
    
    competences.push({ nom, description, niveau });
    localStorage.setItem('competences', JSON.stringify(competences));
    
    afficherCompetences();
}

function afficherCompetences() {
    const competences = JSON.parse(localStorage.getItem('competences')) || [];
    const liste = document.getElementById('listeComp');
    liste.innerHTML = '';
    
    competences.forEach((comp, index) => {
        const div = document.createElement('div');
        div.className = 'competence';
        div.innerHTML = `
            <h3>${comp.nom}</h3>
            <p>${comp.description}</p>
            <p>Niveau: ${comp.niveau}</p>
            
            <button onclick="modifierCompetence(${index})">Modifier</button>
            <button onclick="supprimerCompetence(${index})">Supprimer</button>
        `;
        liste.appendChild(div);
    });
}

function modifierCompetence(index) {
    const competences = JSON.parse(localStorage.getItem('competences')) || [];
    const comp = competences[index];
    
    document.getElementById('nom').value = comp.nom;

    document.getElementById('description').value = comp.description;
    document.getElementById('niveau').value = comp.niveau;
    
    competences.splice(index, 1);
    localStorage.setItem('competences', JSON.stringify(competences));
    afficherCompetences();
}

function supprimerCompetence(index) {
    const competences = JSON.parse(localStorage.getItem('competences')) || [];
    competences.splice(index, 1);
    localStorage.setItem('competences', JSON.stringify(competences));
    afficherCompetences();
}


afficherCompetences();