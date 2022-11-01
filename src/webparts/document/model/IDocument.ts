import { IPickerTerms, TaxonomyPicker } from '@pnp/spfx-controls-react/lib/TaxonomyPicker';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';

export interface IDocument {
    titreDoc: string;
    annee: string;
    noteDoc : string;
    quantite : string;
    descDoc : string;
    name: string;
    srcPage: string;
    noDoc: string;
    sermonFrancaisIPick: IPickerTerms;
    status: string;
    modeForm: string; 
    sermonFrancaisText: string;
    sermonFrancais: string;
    sermonAnglais : string;
    sermonAnglaisText: string;
    sermonAnglaisIPick: IPickerTerms;
    typeLivre : string;
    typeLivreText: string;
    typeLivreIPick: IPickerTerms;
    modecreation: boolean;
    dateCorrespondance: Date;
    dateCorrespondanceText: string;
    datePredication: Date;
    datePredicationText: string;  
    statutOptions: IDropdownOption[];
    etatOptions: IDropdownOption[];
    etatSelectedItem: IDropdownOption;
    etatSelectedItems: IDropdownOption[];
    statutTacheSelectedItem: IDropdownOption;
    statutTacheSelectedItems: IDropdownOption[];
    intituleLivre : string;
    intituleLivreText: string;
    intituleLivreIPick: IPickerTerms;
    

    
}
