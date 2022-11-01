import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IDocumentProps {
  context: WebPartContext;
  siteUrl: string;
  name: string;
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}
