import * as React from 'react';
import * as $ from 'jquery';
import styles from './Document.module.scss';
require('./Styles/CustomCSS-FormDoc.css');
import { IDocumentProps } from './IDocumentProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { TaxonomyPicker, IPickerTerms, IPickerTerm } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";
import { DateTimePicker, DateConvention } from '@pnp/spfx-controls-react/lib/dateTimePicker';
import { default as pnp, ItemUpdateResult } from "sp-pnp-js";
import { IDocument } from "../model/IDocument";
import "@pnp/sp/sputilities";
import { Web } from "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/site-users/web";
import "@pnp/sp";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/components/Dropdown";
import {
  PrimaryButton,
  DefaultButton,
} from "office-ui-fabric-react/lib/components/Button";
import { ISiteUserProps } from "@pnp/sp/site-users";
import Notiflix from "notiflix";
import { JSONParser } from "@pnp/odata";
import Constantes from "../commun/constantes";



export default class Document extends React.Component<IDocumentProps, IDocument>
{
  //
  constructor(props) {
    super(props);
    this.handleNoteDoc = this.handleNoteDoc.bind(this);
    this.handleDescDoc = this.handleDescDoc.bind(this);
    this.handleAnnee = this.handleAnnee.bind(this);
    this.handletitreDoc = this.handletitreDoc.bind(this);
    this.handleQuantite = this.handleQuantite.bind(this);
    this.handleSermonFrancais = this.handleSermonFrancais.bind(this);
    this.handleSermonAnglais = this.handleSermonAnglais.bind(this);
    this.handleTypeLivre = this.handleTypeLivre.bind(this);
    this.handleStatutTache = this.handleStatutTache.bind(this);
    this.handleEtat = this.handleEtat.bind(this);
    this.getStatutOptions = this.getStatutOptions.bind(this);
    this.getEtatOptions = this.getEtatOptions.bind(this);
    this.handleIntituleLivre = this.handleIntituleLivre.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleDatePredication = this.handleDatePredication.bind(this);



    this.state = {
      titreDoc: "",
      annee: "",
      noteDoc: "",
      quantite: "",
      name: "",
      srcPage: "",
      descDoc: "",
      noDoc: "",
      sermonFrancaisText: '',
      sermonFrancais: '',
      sermonFrancaisIPick: undefined,
      sermonAnglais: '',
      sermonAnglaisIPick: undefined,
      sermonAnglaisText: '',
      typeLivre: '',
      typeLivreIPick: undefined,
      typeLivreText: '',
      status: "",
      modeForm: "creation",
      modecreation: true,
      dateCorrespondance: undefined,
      dateCorrespondanceText: "",
      datePredication: undefined,
      datePredicationText: "",
      statutOptions: [],
      etatOptions: [],
      etatSelectedItem: undefined,
      etatSelectedItems: [],
      statutTacheSelectedItem: undefined,
      statutTacheSelectedItems: [],
      intituleLivre: '',
      intituleLivreIPick: undefined,
      intituleLivreText: '',

    };
  }

  //Opérations Before Mount   typeLivre
  public componentWillMount() {
    try {
      this.NotiflixParam();
      Notiflix.Loading.Standard();
      var queryParms = new UrlQueryParameterCollection(window.location.href);
      this.setState({ modeForm: queryParms.getValue(Constantes.param.Mode) });
      this.setState({ srcPage: queryParms.getValue(Constantes.param.srcPage) });
    }
    catch (e) {
      Notiflix.Loading.Remove();
      Notiflix.Report.Failure('Erreur', Constantes.message.erreurException, Constantes.textBouton.Fermer, () => { this.retourAccueil(); });
      //await this.ecrireErreur("componentWillMountReq", e);
    }
  }

  //Opérations Post Mount
  public async componentDidMount() {
    try {  
      //if (this.state.modeForm != Constantes.modesForm.Creation) await this.getRequete();
      if (this.state.modeForm == Constantes.modesForm.Creation) {
        await this.getStatutOptions(this.state.modeForm);

      }
      if (this.state.modeForm == Constantes.modesForm.Creation) {
        await this.getEtatOptions(this.state.modeForm);

      }
      Notiflix.Loading.Remove();
    }
    catch (e) {
      Notiflix.Loading.Remove();
      Notiflix.Report.Failure('Erreur', Constantes.message.erreurException, Constantes.textBouton.Fermer, () => { this.retourAccueil(); });
      //await this.ecrireErreur("componentDidMountReq", e);
    }
  }

  //fonction de gestion du champ sermonFrancais
  private handleSermonFrancais(terms: IPickerTerms) {
    let tagsString: string = '';
    for (let i = 0; i < terms.length; i++) {
      if (i == terms.length - 1)
        tagsString += `${terms[i].name}|${terms[i].key}`;
      else
        tagsString += `${terms[i].name}|${terms[i].key};`;
    }

    this.setState({ sermonFrancais: tagsString });
  }

  //fonction de gestion du champ sermonAnglais
  private handleSermonAnglais(terms: IPickerTerms) {
    let tagsString: string = '';
    for (let i = 0; i < terms.length; i++) {
      if (i == terms.length - 1)
        tagsString += `${terms[i].name}|${terms[i].key}`;
      else
        tagsString += `${terms[i].name}|${terms[i].key};`;
    }

    this.setState({ sermonAnglais: tagsString });
  }

  //fonction de gestion du champ statutTacheSelectedItem    handleEtat
  private handleStatutTache = (item: IDropdownOption): void => {
    this.setState({ statutTacheSelectedItem: item });
  }

   //fonction de gestion du champ statutTacheSelectedItem    
   private handleEtat = (item: IDropdownOption): void => {
    this.setState({ etatSelectedItem: item });
  }

   //fonction de gestion du champ typeLivre    
   private handleIntituleLivre(terms: IPickerTerms) {
    let tagsString: string = '';
    for (let i = 0; i < terms.length; i++) {
      if (i == terms.length - 1)
        tagsString += `${terms[i].name}|${terms[i].key}`;
      else
        tagsString += `${terms[i].name}|${terms[i].key};`;
    }

    this.setState({ intituleLivre: tagsString });
  }

  //fonction de gestion du champ typeLivre    
  private handleTypeLivre(terms: IPickerTerms) {
    let tagsString: string = '';
    for (let i = 0; i < terms.length; i++) {
      if (i == terms.length - 1)
        tagsString += `${terms[i].name}|${terms[i].key}`;
      else
        tagsString += `${terms[i].name}|${terms[i].key};`;
    }

    this.setState({ typeLivre: tagsString });
  }

  //fonction de gestion du champ noReq
  private handleNoteDoc(value: string): void {
    return this.setState({
      noteDoc: value,
    });
  }
  
  //fonction de gestion du champ description
  private handleDescDoc(value: string): void {
    return this.setState({
      descDoc: value,
    });
  }
  //fonction de gestion du champ annee
  private handleAnnee(value: string): void {
    return this.setState({
      annee: value,
    });
  }
  //fonction de gestion du champ expediteur   
  private handletitreDoc(value: string): void {
    return this.setState({
      titreDoc: value,
    });
  }

  //fonction de gestion du champ   handleQuantite
  private handleQuantite(value: string): void {
    return this.setState({
      quantite: value,
    });
  }

  //fonction pour populer le champ Statut Tâche    getEtatOptions
  private async getStatutOptions(mode: string): Promise<void> {
    if (mode == Constantes.modesForm.Creation) {
      this.state.statutOptions.push({ key: "Brochure", text: "Brochure" });
      this.state.statutOptions.push({ key: "Bible", text: "Bible" });
      this.state.statutOptions.push({ key: "Livre", text: "Livre" });
    }

  }

   //fonction pour populer le champ Etat 
   private async getEtatOptions(mode: string): Promise<void> {
    if (mode == Constantes.modesForm.Creation) {
      this.state.etatOptions.push({ key: "Disponible", text: "Disponible" });
      this.state.etatOptions.push({ key: "En impression", text: "En impression" });
    }

  }

  /*********************************************Fonctions de redirection***********************************************/
  //

  //fonction qui redirige vers le tableau de provenance
  private retourAuTableauSource(): void {
    window.location.replace(this.props.siteUrl + "/SitePages/" + this.state.srcPage + ".aspx");
  }

  //fonction qui redirige vers le formulaire de création de tâche
  private redirectTache(): void {
    //window.location.replace(this.props.siteUrl + "/SitePages/CreationTache.aspx?noReq=" + this.state.noReq + "&mode=creation&srcPage=" + this.state.srcPage);
  }

  //fonction qui redirige vers la page d'accueil du site
  private rafraichirPageCourante(): void {
    window.location.reload();
  }

  //Fonction de redirection vers la page d'accueil
  private retourAccueil(): void {
    window.location.replace(this.props.siteUrl);
  }

  //

  //---------------------------- Fonctions générales------------------------------------


  // Validation du formulaire création
  private async validerFormCreation(): Promise<void> {
    try {
      $('.ms-Button--primary').blur();
      let allow: boolean = true;
     /* if (this.state.titreDoc === '') {
        allow = false;
        Notiflix.Notify.Failure("Le champ Titre est obligatoire.");
      }

      if (this.state.noteDoc === '') {
        allow = false;
        Notiflix.Notify.Failure("Le champ note est obligatoire.");
      }

      if (this.state.descDoc === '') {
        allow = false;
        Notiflix.Notify.Failure("Le champ description est obligatoire.");
      }*/

      if (allow) {
        Notiflix.Loading.Hourglass(Constantes.message.traitementEnCours);
        await this.creerRequete();
        Notiflix.Loading.Remove();
        Notiflix.Report.Success('Succès',
          this.state.status,
          Constantes.textBouton.Fermer,
          () => {
            Notiflix.Confirm.Show(
              Constantes.message.titrePremiereTache,
              Constantes.message.messagePremiereTache,
              Constantes.textBouton.CreerPremTache,
              Constantes.textBouton.Annuler,
              () => { this.redirectTache(); },
              () => { this.retourAccueil(); }
            );
          }
        );
      }

    }
    catch (e) {
      Notiflix.Loading.Remove();
      //Notiflix.Report.Failure('Erreur', Constantes.message.erreurException, Constantes.textBouton.Fermer, () => { this.retourAccueil(); });
      //await this.ecrireErreur("validerFormCreerReq", e);
    }
  }


  /* Fonction qui formate la date */
  private formatDate(d: Date): string {
    if (!d) return undefined;
    var month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  /* Fonction qui ajoute des zéros avant un nombre */
  private padLeadingZeros(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  //fonction de gestion du champ dateCorrespondance   handleDatePredication
  private handleDate = (date: Date) => {
    this.setState({ dateCorrespondance: date });
    this.setState({ dateCorrespondanceText: this.formatDate(date) });
  }

  private handleDatePredication = (date: Date) => {
    this.setState({ datePredication: date });
    this.setState({ datePredicationText: this.formatDate(date) });
  }

  /*Fonction de création d'item de liste requête*/
  private async creerRequete(): Promise<void> {
    //Gestion numéro de requête
    const listParam = pnp.sp.web.lists.getByTitle(Constantes.titreListe.Parametres);
    const items = await listParam.items.getAll();
    let idDernierNumDoc;
    let palier;
    let numDoc;

    for (let i = 0; i < items.length; i++) {
      if (items[i].Title == "Préfixe")
        palier = items[i].BLEValeur;
      else if (items[i].Title == "Dernier numéro de Requête") {
        idDernierNumDoc = items[i].ID;
        numDoc = items[i].BLEValeur;
      }
    }

    //Configurer le prochain numéro de requête
    const prochainNumeroReq = parseInt(numDoc) + 1;

    //Affecter le numéro de requête
    const NoDocChamp: string = palier.toString() + '-' + new Date().getFullYear() + '-' + this.padLeadingZeros(prochainNumeroReq, 6).toString();
    this.setState({ noDoc: NoDocChamp });

    //Création du dossier Requête
    const newfolder = await pnp.sp.web.rootFolder.folders.getByName(Constantes.internalName.ListeDocument).folders.add("My New Folder");
    const values = await pnp.sp.web.getFolderByServerRelativePath(Constantes.internalName.ListeDocument + '/My New Folder').listItemAllFields.get();
    const MyId = values.Id;

    //On récupère le type de contenu requête
    const listDoc = pnp.sp.web.lists.getByTitle(Constantes.titreListe.Document);
    const docContentTypes = await listDoc.contentTypes.get();
    let docContentTypeId;
    for (let i = 0; i < docContentTypes.length; i++) {
      if (docContentTypes[i].Name == Constantes.dataDocument.TitreTypeContenu)
        docContentTypeId = docContentTypes[i].Id.StringValue;
    }
    if (docContentTypeId) {
      //On ajoute le dossier requête
      await pnp.sp.web.lists.getByTitle(Constantes.titreListe.Document).items.getById(MyId).update({
        ContentTypeId: docContentTypeId,
        FileLeafRef: NoDocChamp,
        //DescDocPelerin: this.state.descDoc != null ? this.state.descDoc : "",
        //NoteDocPelerins: this.state.noteDoc != null ? this.state.noteDoc : "",
        TitreDocPelerin : "",
        Quantite: this.state.quantite != null ? this.state.quantite : "",
        annee: this.state.annee != null ? this.state.annee : "",
        TypeduLivre: this.state.statutTacheSelectedItem.text != null ? this.state.statutTacheSelectedItem.text : "",
        Etat: this.state.etatSelectedItem.text != null ? this.state.etatSelectedItem.text : "",
        //DateCorres: this.state.dateCorrespondance != null ? this.state.dateCorrespondance : void 0,
        datePredication: this.state.datePredication != null ? this.state.datePredication : void 0,
      }).then((iur: ItemUpdateResult) => {
        console.log(iur);
        this.setState({ status: "Votre nouveau document '" + NoDocChamp + "' a été créée avec succès." });
        //this.ecrireHistorique(Constantes.historique.TypeEvenementAjoutReq);
      });

      if (this.state.sermonFrancais != null) {
        const i = await pnp.sp.web.lists.getByTitle(Constantes.titreListe.Document).items.getById(MyId).validateUpdateListItem(
          [{
            ErrorMessage: null,
            FieldName: "BLESermonFrancais",
            FieldValue: this.state.sermonFrancais.toString(),
            HasException: false
          }]);
      }

      if (this.state.sermonAnglais != null) {
        const i = await pnp.sp.web.lists.getByTitle(Constantes.titreListe.Document).items.getById(MyId).validateUpdateListItem(
          [{
            ErrorMessage: null,
            FieldName: "BLESermonAnglais",
            FieldValue: this.state.sermonAnglais.toString(),
            HasException: false
          }]);
      }

      /*if (this.state.typeLivre != null) {
        const i = await pnp.sp.web.lists.getByTitle(Constantes.titreListe.Document).items.getById(MyId).validateUpdateListItem(
          [{
            ErrorMessage: null,
            FieldName: "TypeLivre",
            FieldValue: this.state.typeLivre.toString(),
            HasException: false
          }]);
      }*/

      if (this.state.intituleLivre != null) {
        const i = await pnp.sp.web.lists.getByTitle(Constantes.titreListe.Document).items.getById(MyId).validateUpdateListItem(
          [{
            ErrorMessage: null,
            FieldName: "intituleLivre",
            FieldValue: this.state.intituleLivre.toString(),
            HasException: false
          }]);
      }

      //Mise à jour du prochain numéro de requête dans la liste de paramètres   MJQGencoValeur   BLEValeur
      await pnp.sp.web.lists.getByTitle(Constantes.titreListe.Parametres).items.getById(idDernierNumDoc).update({ BLEValeur: prochainNumeroReq.toString() });
    }
  }

  //Fonction de paramétrisation de Notiflix
  private NotiflixParam() {
    Notiflix.Report.Init({
      className: 'notiflix-report',
      width: 'auto',
      backgroundColor: '#fff',
      borderRadius: '25px',
      rtl: false,
      zindex: 4002,
      backOverlay: true,
      backOverlayColor: '#ffffff',
      useGoogleFont: false, // v2.2.0 and the next versions => has been changed as "false"
      fontFamily: 'Quicksand',
      svgSize: '110px',
      plainText: false,
      titleFontSize: '16px',
      titleMaxLength: 34,
      messageFontSize: '19px',
      messageMaxLength: 10000,
      buttonFontSize: '14px',
      buttonMaxLength: 34,
      cssAnimation: true,
      cssAnimationDuration: 360,
      cssAnimationStyle: 'fade', // 'fade' - 'zoom'
      success: {
        svgColor: '#32c682',
        titleColor: '#1e1e1e',
        messageColor: '#242424',
        buttonBackground: '#32c682',
        buttonColor: '#fff',
        backOverlayColor: 'rgba(0,0,0,0.7)', // v2.2.0 and the next versions
      },
      failure: {
        svgColor: '#ff5549',
        titleColor: '#1e1e1e',
        messageColor: '#242424',
        buttonBackground: '#ff5549',
        buttonColor: '#fff',
        backOverlayColor: 'rgba(0,0,0,0.7)', // v2.2.0 and the next versions
      },
      warning: {
        svgColor: '#eebf31',
        titleColor: '#1e1e1e',
        messageColor: '#242424',
        buttonBackground: '#eebf31',
        buttonColor: '#fff',
        backOverlayColor: 'rgba(0,0,0,0.7)', // v2.2.0 and the next versions
      },
      info: {
        svgColor: '#26c0d3',
        titleColor: '#1e1e1e',
        messageColor: '#242424',
        buttonBackground: '#26c0d3',
        buttonColor: '#fff',
        backOverlayColor: 'rgba(38,192,211,0.2)', // v2.2.0 and the next versions
      },
    });

    Notiflix.Loading.Init({
      className: 'notiflix-loading',
      zindex: 4000,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      rtl: false, useGoogleFont: false,
      fontFamily: 'Quicksand',
      cssAnimation: true,
      cssAnimationDuration: 400,
      clickToClose: false,
      customSvgUrl: null,
      svgSize: '80px',
      svgColor: 'rgba(0, 90, 158)',
      messageID: 'NotiflixLoadingMessage',
      messageFontSize: '24px',
      messageMaxLength: 200,
      messageColor: '#dcdcdc'
    });

    Notiflix.Notify.Init({
      width: 'auto',
      position: 'right-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' && v2.2.0 and the next versions => 'center-top' - 'center-bottom' - 'center-center'
      distance: '10px',
      opacity: 1,
      borderRadius: '5px',
      rtl: false,
      timeout: 5000,
      messageMaxLength: 300,
      backOverlay: false,
      backOverlayColor: 'rgba(0,0,0,0.5)',
      plainText: true,
      showOnlyTheLastOne: false,
      clickToClose: false,
      pauseOnHover: true,
      ID: 'NotiflixNotify',
      className: 'notiflix-notify',
      zindex: 4001,
      useGoogleFont: false, // v2.2.0 and the next versions => has been changed as "false"
      fontFamily: 'Quicksand',
      fontSize: '19px',
      cssAnimation: true,
      cssAnimationDuration: 400,
      cssAnimationStyle: 'fade', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
      closeButton: false,
      useIcon: true,
      useFontAwesome: false,
      fontAwesomeIconStyle: 'basic', // 'basic' - 'shadow'
      fontAwesomeIconSize: '34px',
      success: {
        background: '#32c682',
        textColor: '#fff',
        childClassName: 'success',
        notiflixIconColor: 'rgba(0,0,0,0.2)',
        fontAwesomeClassName: 'fas fa-check-circle',
        fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
        backOverlayColor: 'rgba(50,198,130,0.2)', // v2.2.0 and the next versions
      },
      failure: {
        background: '#ff5549',
        textColor: '#fff',
        childClassName: 'failure',
        notiflixIconColor: 'rgba(0,0,0,0.2)',
        fontAwesomeClassName: 'fas fa-times-circle',
        fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
        backOverlayColor: 'rgba(255,85,73,0.2)', // v2.2.0 and the next versions
      },
      warning: {
        background: '#eebf31',
        textColor: '#fff',
        childClassName: 'warning',
        notiflixIconColor: 'rgba(0,0,0,0.2)',
        fontAwesomeClassName: 'fas fa-exclamation-circle',
        fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
        backOverlayColor: 'rgba(238,191,49,0.2)', // v2.2.0 and the next versions
      },
      info: {
        background: '#26c0d3',
        textColor: '#fff',
        childClassName: 'info',
        notiflixIconColor: 'rgba(0,0,0,0.2)',
        fontAwesomeClassName: 'fas fa-info-circle',
        fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
        backOverlayColor: 'rgba(38,192,211,0.2)', // v2.2.0 and the next versions
      }
    });
  }

  public render(): React.ReactElement<IDocumentProps> {
    const {
      description,
      name,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;
    const { statutTacheSelectedItem, statutTacheSelectedItems } = this.state;

    this.NotiflixParam();
    pnp.setup({
      spfxContext: this.props.context,
    });

    return (
      <form>
        <div className={styles.formulaireRequete}>
          <div className={styles.container}>
            {/* BEGIN SECTION - CREATION FORM */}
            <div className={this.state.modeForm === Constantes.modesForm.Creation ? "enabledForm" : "disabledForm"}>
              <div style={{ display: this.state.modecreation ? 'block' : 'none' }}>
                <div className={`titleRow ${styles.row}`}>
                  <div className="ms-Grid-col ms-u-sm4 block">
                    <h1 className="titreForm">{Constantes.titreDocument.creationDoc}</h1>
                  </div>
                </div>

                <div className={`ms-Grid-row ms-bgColor-neutralLight mainRow ms-fontColor-white ${styles.row}`}>
                  <div>
                    <h2 className="titreFormH2">{Constantes.titreSection.detail}</h2>
                  </div>

                  <div id="sermonFrancaisControlMod" className="ms-Grid-col ms-u-sm4 block">
                    <div className="label">
                      <label className="ms-Label">{Constantes.labelFormCreation.SermonFrancais}</label>
                    </div>
                    <TaxonomyPicker allowMultipleSelections={false}
                      termsetNameOrID="1d5628d3-bed4-4b35-9b7d-578d68dc56c8"
                      panelTitle="Selectionner le terme"
                      placeholder={Constantes.placeholders.sermonFrancais}
                      label=""
                      context={this.props.context as any}
                      onChange={this.handleSermonFrancais}
                      isTermSetSelectable={false}
                    />
                  </div>

                  <div id="sermonAnglaisControlMod" className="ms-Grid-col ms-u-sm4 block">
                    <div className="label">
                      <label className="ms-Label">{Constantes.labelFormCreation.SermonAnglais}</label>
                    </div>
                    <TaxonomyPicker allowMultipleSelections={false}
                      termsetNameOrID="5e76d507-07d9-49db-95df-1e33c24cc1e4"
                      panelTitle="Selectionner le terme"
                      placeholder={Constantes.placeholders.sermonAnglais}
                      label=""
                      context={this.props.context as any}
                      onChange={this.handleSermonAnglais}
                      isTermSetSelectable={false}
                    />
                  </div>

                  <div className="ms-Grid-col ms-u-sm4 block">
                    <div className="label">
                      <label className="ms-Label">{Constantes.labelFormCreation.Type}</label>
                    </div>
                    <Dropdown
                      label=""
                      id="component"
                      multiSelect={false}
                      ariaLabel="Statut de la tâche"
                      options={this.state.statutOptions}
                      selectedKey={this.state.statutTacheSelectedItem != null ? this.state.statutTacheSelectedItem.key : void 0}
                      onChanged={this.handleStatutTache}
                    />
                  </div> 

                  <div className="ms-Grid-col ms-u-sm4 block">
                    <div className="label">
                      <label className="ms-Label">{Constantes.labelFormCreation.Etat}</label>
                    </div>
                    <Dropdown
                      label=""
                      id="component"
                      multiSelect={false}
                      ariaLabel="Etat / disponibilité"
                      options={this.state.etatOptions}
                      selectedKey={this.state.etatSelectedItem != null ? this.state.etatSelectedItem.key : void 0}
                      onChanged={this.handleEtat}
                    />
                  </div>

                  <div id="intituleControlMod" className="ms-Grid-col ms-u-sm4 block">
                    <div className="label">
                      <label className="ms-Label">{Constantes.labelFormCreation.IntituleLivre}</label>
                    </div>
                    <TaxonomyPicker allowMultipleSelections={false}
                      termsetNameOrID="2e9f8c96-7a60-44a0-84ea-98d6cec4dec2"
                      panelTitle="Selectionner le terme"
                      placeholder={Constantes.placeholders.intituleLivre}
                      label=""
                      context={this.props.context as any}
                      onChange={this.handleIntituleLivre}
                      isTermSetSelectable={false}
                    />
                  </div>


                  <div className="ms-Grid-col ms-u-sm4 block" style={{ display: "flex" }}>
                    <div className="ms-Grid-col ms-u-sm4 flexed block">
                      <div className="label">
                        <label className="ms-Label">{Constantes.labelFormCreation.DatePredication}</label>
                      </div>
                      <DateTimePicker
                      dateConvention={DateConvention.Date}
                      formatDate={(date: Date) => this.formatDate(date)}
                      maxDate={new Date()}
                      value={this.state.datePredication}
                      onChange={this.handleDatePredication}
                      showLabels={false}
                      placeholder={Constantes.placeholders.datePredication}
                    />
                    </div>

                    <div className="ms-Grid-col ms-u-sm4 flexed block">
                      <div className="label">
                        <label className="ms-Label">{Constantes.labelFormCreation.Annee}</label>
                      </div>
                      <TextField
                        maxLength={100}
                        autoAdjustHeight
                        value={this.state.annee}
                        onChanged={this.handleAnnee}
                        placeholder={Constantes.placeholders.annee}
                      />
                    </div>

                    <div className="ms-Grid-col ms-u-sm4 flexed block">
                      <div className="label">
                        <label className="ms-Label">{Constantes.labelFormCreation.Quantite}</label>
                      </div>
                      <TextField
                        maxLength={100}
                        autoAdjustHeight
                        value={this.state.quantite}
                        onChanged={this.handleQuantite}
                        placeholder={Constantes.placeholders.quantite}
                      />
                    </div>
                  </div>


                  <div className="ms-Grid-col ms-u-sm4 block" style={{ display: "flex" }}>
                    
					 

                    
                  </div>

                 
                 

                  
                  













                </div>


                <div className={`ms-Grid-row ms-bgColor-neutralLight buttonRow ms-fontColor-white ${styles.row}`}>
                  <div className="buttonWrap" style={{ display: "flex" }}>
                    <div className="colButton">
                      <DefaultButton
                        text={Constantes.textBouton.Annuler}
                        onClick={() => {
                          // this.retourAccueil();
                        }}
                      />
                    </div>
                    <div className="colButton">
                      <PrimaryButton
                        text={Constantes.textBouton.CreerDocument}
                        onClick={() => {
                          this.validerFormCreation();
                        }}
                      />
                    </div>
                  </div>
                </div>




              </div>


            </div>
            {/* END SECTION - CREATION FORM */}
            {/* BEGIN SECTION - MODIFICATION FORM */}
            <div className={this.state.modeForm === Constantes.modesForm.Modification ? "enabledForm" : "disabledForm"}>



            </div>
            {/* END SECTION - MODIFICATION FORM */}
            {/* BEGIN SECTION - READ FORM */}
            <div className={this.state.modeForm === Constantes.modesForm.Lecture ? "enabledForm" : "disabledForm"}>
              {/* ---*/}

            </div>
            {/* END SECTION - READ FORM */}
          </div>
        </div>
      </form >
    );
  }
}
