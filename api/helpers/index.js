
// Permet de l'utiliser dans tableUsers, ce qui permet en cas de suppression d'un utilisateur
// de remplacer l'id du tableau sans toucher à l'id de l'utilisateur
module.exports = {
    // Incrémentation 
    inc: (value, option) => {
        return parseInt(value) + 1
    }
}

