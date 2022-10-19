//=======Configuration de Multer========//

const multer = require('multer');//Package qui permet de capter les fichiers envoyés avec une req http

//On se prepare un dictionnaire(extention) de minetype 
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};


// On crée un objet de config pour mutler et on utilise diskStorage de multer pour dire qu'on va l'enregistrer sur le disque
const storage = multer.diskStorage({
    destination: (req, file ,callback) => {// fonction expliquant a multer dans quel dossier enregistrer les fichiers
        callback(null, 'images')//null pour dire qu'il n'ya pas eu d'erreur + le nom de dossier
    },
    //fonction expliquant a multer quel nom de fichier utiliser
    filename: (req, file, callback) => {
       
        const name = file.originalname.split(' ').join('_'); // On élimine les espaces qui peuvent se trouver dans un nom de fichier on les rejoint avec les ('_') avec la méthode split
        const extension = MIME_TYPES[file.mimetype];//mimetype du fichier envoyé par notre dictionnaire pour le rendre le plus unquique possible
        callback(null, Date.now() + name + '.' + extension); //on crée le filename complet avec le callback
    }
});

//On exporte notre multer dans router.post et .put avec single pour dire qu'il s'agit d'un ficher unique et on dit à multer que c'est le fichier image
module.exports = multer({ storage: storage}).single('file')