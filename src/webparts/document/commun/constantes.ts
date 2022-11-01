export default class Constantes {
    public static dataDocument = {
        IDTypeContenu: '0x01200093849808AC583D4FA7E8A2BA4545E3C7007CC80AA3E02CC2409C929FBF862A302B',
        TitreTypeContenu: 'Document Biblio',
        StatutTacheNouvelle: 'Nouvelle',
        NomChampRepondantTache: "MJQGencoRepondantTache"  
    };

    public static dataRequete = {
        IDTypeContenu: '0x01200093849808AC583D4FA7E8A2BA4545E3C7007CC80AA3E02CC2409C929FBF862A302B',
        TitreTypeContenu: 'Requête GeNCo',
        StatutTacheNouvelle: 'Nouvelle',
        NomChampRepondantTache: "MJQGencoRepondantTache"
    };

    public static creationDocument = {
        TitreDocument: "Formulaire enregistrement document",
        NomDocument: "Modification d'une requête"
    };

    public static titreSection = {
        detail: 'Détails',
        info: 'Informations complémentaires'
    };

  

    public static placeholders = {
        titreReq: "Inscrire le titre de la requête",
        typeLivre: "Inscrire le type ",
        description: "Inscrire la description de la requête",
        noUltima: "Inscrire le numéro fourni par Ultima (p. ex. : 99690)",
        datePredication: "Inscrire la date de prédication",
        autreRef:"Inscrire le numéro provenant d'un autre système (p. ex. : Sagesse)",
        annee:"Annee",
        codeClassification:"Code classification",
        quantite:"Inscrire la quantité ",
        codeClass:"",
        regleCons:"",
        expediteur:"Inscrire le Nom, Prénom, ou le nom de l'organisation",
        typeExpediteur:"Sélectionner un choix ",
        sermonAnglais:"Sélectionner un choix ",
        intituleLivre:"Sélectionner un intitulé du livre ",
        sermonFrancais:"Sélectionner un choix ",
        dateCor:"Sélectionner la date inscrite sur la correspondance",
        motsCles:"Sélectionner un ou plusieurs choix",
        notes:"Inscrire toute note jugée utile"
    };
    
   

    public static titreForm = {
        creationReq: "Création de la requête",
        modificationReq: "Modification de la requête",
        detailseReq: "Détails de la requête"
    };
    public static titreDocument = {
        creationDoc: "Création du document",
        modificationReq: "Modification de la requête",
        detailseReq: "Détails de la requête"
    };

    public static modesForm = {
        Creation: "creation",
        Lecture: "lecture",
        Modification: "modification"
    };

    public static textBouton = {
        Annuler: "Annuler",
        Fermer: "Fermer",
        Ok: "Ok",
        Oui: "Oui",
        Non: "Non",
        Assigner: "Assigner",
        Envoyer: "Envoyer",
        Terminer: "Terminer",
        PremiereTache: "Voulez vous créer une première tâche?",
        RetourAccueil: "Retourner à l'accueil",
        CreerRequete: "Créer la requête",
        CreerDocument: "Créer le document",
        ModifierRequete: "Modifier la requête",
        CreerPremTache: "Créer une tâche",
        RetourTache: "Retourner aux tâches"
    };
    public static labelFormCreation = {
        NoReq: "Numéro de requête",
        Type: "Type",
        Etat: "Etat / disponibilité",
        TitreReq: "Titre de la requête",
        Description: "Description de la requête",
        NoUltima: "Numéro Ultima",
        DatePredication: "Date prédication",
        AutresRef: "Autre référence",
        Annee: "Année",
        Quantite: "Quantité",
        Expediteur: "Expéditeur",
        TypeExpediteur: "Type d'expéditeur",
        SermonFrancais: "Sermon en francais",
        SermonAnglais: "Sermon en anglais",
        IntituleLivre: "Intitulé du livre",
        DateCorrespondance: "Date de correspondance",
        MotsCles: "Mots clés",
        CodeClass: "Code de classification",
        RegleConservation: "Règle de conservation",
        NotesReq: "Notes complémentaires"
    };

    public static labelFormDocument = {
        titreDoc: "Titre du document",
        descDoc: "Description du document",
        noteDoc: "Note document"
        
    };


    public static labelForm = {
        TitreReq: "Titre de la requête",
        NoReq: "Numéro de requête",
        Description: "Description",
        NoUltima: "Numéro Ultima",
        AutresRef: "Autre référence",
        Expediteur: "Expéditeur",
        groupeInitiateur: "Groupe initiateur",
        TypeExpediteur: "Type d'expéditeur",
        DateCorrespondance: "Date de correspondance",
        MotsCles: "Mots clés",
        CodeClass: "Code de classification",
        RegleConservation: "Règle de conservation",
        NotesReq: "Notes complémentaires"
    };

    public static URL = {
        Requete: "/Requetes/"
    };

    public static titreListe = {
        Requetes: "Requêtes",
        Historique: "Historique",
        Document: "Document",
        RepGrp: "Répertoire des groupes",
        Parametres: "Paramètres",
        journalErreurs: "Journal des erreurs"
    };

    public static internalName = {
        Titre: "Title",
        TitreReq: "MJQGencoTitreRequete",
        FileLeafRef: "FileLeafRef",
        ListeRequete: "Requetes",
        ListeDocument: "Document",
        EffectuePar: "MJQGencoEffectuePar",
        Description: "MJQGencoDescription",
        NoUltima: "MJQGencoNoUltima",
        AutresRef: "MJQGencoAutresRefs",
        Expediteur: "MJQGencoExpediteur",
        TypeExpediteur: "MJQGencoTypeExpediteur",
        DateCorrespondance: "MJQGencoDateCorresp",
        MotsCles: "MJQGencoMotsCles",
        CodeClass: "MJQGencoCodeClass",
        RegleConservation: "MJQGencoRegleCons",
        NotesReq: "MJQGencoNotes",
        Modified: "Modified",
        GrpInit: "MJQGencoGroupeInitiateur"
    };

    public static message = {
        StatutCreationReqSucces: "Votre requête a été créée avec succès.",
        ValidationCreerReq: "Êtes-vous sûr de vouloir créer la requête ?",
        ValidationModifierReq: "Êtes-vous sûr de vouloir modifier la requête ?",
        TraitementDemande: "Traitement de votre demande ...",
        Required: "Ce champ est requis",
        ConfirmerReq: 'Vérfiez les données entrées dans le formulaire et cliquez sur le bouton "Confirmer" pour envoyer votre demande.',
        CreerTache: "Voulez-vous créer une première tâche?",
        traitementEnCours: "Traitement en cours. Veuillez patienter...",
        attentionModified: "Attention! La requête a été modifiée par un autre utilisateur. <br>Cliquez sur Fermer pour recharger la page.",
        titrePremiereTache: "Première tâche",
        messagePremiereTache: "Voulez-vous créer une première tâche?",
        erreurException: "Une erreur s’est produite durant l'opération.\nVeuillez communiquer avec le pilote Genco."
    };

    public static param = {
        Mode: "mode",
        IdReq: "IdReq",
        srcPage: "srcPage"
    };
}