import { footer } from "./footer";
import { homePage } from "./home-page";
import { jambFooter } from "./jamb-footer";
import { navbar } from "./navbar";
import { page } from "./page";
import { redirect } from "./redirect";
import { settings } from "./settings";

export const singletons = [homePage, settings, footer, navbar, jambFooter];

export const documents = [page, ...singletons, redirect];
