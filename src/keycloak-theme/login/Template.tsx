// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import { useState } from "react";
import { assert } from "keycloakify/tools/assert";
import { clsx } from "keycloakify/tools/clsx";
import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate";
import { type TemplateProps } from "keycloakify/login/TemplateProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        displayWide = false,
        showAnotherWayIfPresent = true,
        headerNode,
        showUsernameNode = null,
        infoNode = null,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { getClassName } = useGetClassName({ doUseDefaultCss, classes });

    const { msg, changeLocale, labelBySupportedLanguageTag, currentLanguageTag } = i18n;

    const { realm, locale, auth, url, message, isAppInitiatedAction } = kcContext;

    const { isReady } = usePrepareTemplate({
        "doFetchDefaultThemeResources": doUseDefaultCss,
        "styles": [
            `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly.min.css`,
            `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly-additions.min.css`,
            `${url.resourcesCommonPath}/lib/zocial/zocial.css`,
            `${url.resourcesPath}/css/login.css`
        ],
        "htmlClassName": getClassName("kcHtmlClass"),
        "bodyClassName": getClassName("kcBodyClass")
    });

    useState(()=> { document.title = i18n.msgStr("loginTitle", kcContext.realm.displayName); });

    if (!isReady) {
        return null;
    }

    const DocsWellIcon = () => (
        <svg width="150" height="32" viewBox="0 0 150 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.9914 32C24.8232 32 31.9827 24.8366 31.9827 16C31.9827 7.16344 24.8232 0 15.9914 0C7.15958 0 0 7.16344 0 16C0 24.8366 7.15958 32 15.9914 32Z" fill="#0377FF" />
            <path d="M22.588 11.9221C22.588 9.53619 20.6549 7.60205 18.2703 7.60205H12.5933C11.2686 7.60205 10.1946 8.67656 10.1946 10.0021C10.1946 11.3275 11.2686 12.4021 12.5933 12.4021H22.588V11.9221Z" fill="white" fillOpacity="0.9" />
            <path d="M13.1933 15.9C13.1933 14.2983 11.8955 13 10.2948 13C8.69404 13 7.39636 14.2983 7.39636 15.9C7.39636 17.5016 8.69404 18.7999 10.2948 18.7999C11.8955 18.7999 13.1933 17.5016 13.1933 15.9Z" fill="white" fillOpacity="0.9" />
            <path d="M25.3867 16.002C25.3867 14.6766 24.3128 13.6021 22.988 13.6021H16.3916C15.0668 13.6021 13.9929 14.6766 13.9929 16.002C13.9929 17.3275 15.0668 18.402 16.3916 18.402H22.988C24.3128 18.402 25.3867 17.3275 25.3867 16.002Z" fill="white" fillOpacity="0.95" />
            <path d="M22.588 19.6021H12.5933C11.2686 19.6021 10.1946 20.6765 10.1946 22.0021C10.1946 23.3275 11.2686 24.4021 12.5933 24.4021H18.2703C20.6549 24.4021 22.588 22.4679 22.588 20.0821V19.6021Z" fill="white" fillOpacity="0.9" />
            <path d="M40.8178 25.7445H47.1327C53.1655 25.7445 57.4224 21.6545 57.4224 15.8722C57.4224 10.0899 53.1655 6 47.1327 6H40.8178V25.7445ZM47.1327 9.61041C50.7411 9.61041 53.4757 12.3182 53.4757 15.8722C53.4757 19.4262 50.7411 22.134 47.1327 22.134H44.68V9.61041H47.1327Z" fill="black" />
            <path d="M65.5729 26.0814C69.8579 26.0814 72.8744 23.0352 72.8744 18.6914C72.8744 14.3475 69.8579 11.3013 65.5165 11.3013C61.2314 11.3013 58.1868 14.3475 58.1868 18.6914C58.1868 23.0352 61.2597 26.0814 65.5729 26.0814ZM65.5729 22.6402C63.4586 22.6402 61.9926 21.0043 61.9926 18.6914C61.9926 16.3784 63.4586 14.7425 65.5165 14.7425C67.6027 14.7425 69.0686 16.3784 69.0686 18.6914C69.0686 21.0043 67.6308 22.6402 65.5729 22.6402Z" fill="black" />
            <path d="M81.3976 26.0814C84.245 26.0814 86.7258 24.5582 87.8252 21.8787L84.3013 20.6376C83.7656 21.8223 82.5817 22.5838 81.2285 22.5838C79.1142 22.5838 77.6482 20.976 77.6482 18.6914C77.6482 16.4067 79.086 14.7989 81.1721 14.7989C82.5253 14.7989 83.7093 15.504 84.245 16.6041L87.7406 15.363C86.6694 12.7681 84.1604 11.3013 81.3412 11.3013C76.9434 11.3013 73.8423 14.3758 73.8423 18.6914C73.8423 23.0069 76.9717 26.0814 81.3976 26.0814Z" fill="black" />
            <path d="M94.3542 26.0814C97.6243 26.0814 99.9924 24.3891 99.9924 21.8223C99.9924 20.0453 98.8929 17.9861 96.1302 17.3092L94.3542 16.8579C93.3112 16.6041 92.7191 16.2374 92.7191 15.7297C92.7191 14.9399 93.3675 14.4604 94.4388 14.4604C95.5382 14.4604 96.7504 14.9399 97.0324 15.7297L99.9642 14.404C99.3158 12.5705 97.0605 11.3013 94.467 11.3013C91.0277 11.3013 89.1107 12.9372 89.1107 15.7861C89.1107 17.7887 90.7458 19.4247 93.4521 20.1298L94.777 20.4684C95.7637 20.7222 96.4121 21.0325 96.4121 21.7658C96.4121 22.5274 95.6228 22.8941 94.3261 22.8941C93.001 22.8941 91.958 22.1607 91.3942 21.2299L88.3777 22.6121C89.3362 24.7839 91.5632 26.0814 94.3542 26.0814Z" fill="black" />
            <path d="M104.62 25.7445H108.651L112.429 11.8387L116.15 25.7445H120.21L126.102 6H122.183L118.208 19.8211L114.345 6H110.512L106.706 20.0468L102.703 6H98.7845L104.62 25.7445Z" fill="black" />
            <path d="M131.61 26.0814C134.88 26.0814 137.079 24.6711 138.262 22.3018L134.992 21.0043C134.429 22.0761 133.498 22.8376 131.976 22.8376C130.116 22.8376 128.622 21.7094 128.311 19.594H138.601C138.601 14.3194 135.443 11.3013 131.778 11.3013C127.522 11.3013 124.506 14.3475 124.506 18.6914C124.506 23.0352 127.437 26.0814 131.61 26.0814ZM131.638 14.4322C133.075 14.4322 134.175 15.1373 134.683 16.8298H128.48C128.931 15.2219 130.002 14.4322 131.638 14.4322Z" fill="black" />
            <path d="M140.208 25.7445H143.93L143.958 6H140.236L140.208 25.7445Z" fill="black" />
            <path d="M145.57 25.7445H149.291L149.319 6H145.598L145.57 25.7445Z" fill="black" />
        </svg>
    );

    return (
        <div className={getClassName("kcLoginClass")}>
            <div id="kc-header" className={getClassName("kcHeaderClass")}>
                <div 
                    id="kc-header-wrapper" 
                    className={getClassName("kcHeaderWrapperClass")}
                    style={{ "fontFamily": '"Work Sans"' }}
                >
                    {/* {msg("loginTitleHtml", realm.displayNameHtml)}!!! */}
                    <DocsWellIcon />
                    Login to the practice portal
                </div>
            </div>

            <div className={clsx(getClassName("kcFormCardClass"), displayWide && getClassName("kcFormCardAccountClass"))}>
                <div id="kc-content">
                    <div id="kc-content-wrapper">
                        {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                        {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                            <div className={clsx("alert", `alert-${message.type}`)}>
                                {message.type === "success" && <span className={getClassName("kcFeedbackSuccessIcon")}></span>}
                                {message.type === "warning" && <span className={getClassName("kcFeedbackWarningIcon")}></span>}
                                {message.type === "error" && <span className={getClassName("kcFeedbackErrorIcon")}></span>}
                                {message.type === "info" && <span className={getClassName("kcFeedbackInfoIcon")}></span>}
                                <span
                                    className="kc-feedback-text"
                                    dangerouslySetInnerHTML={{
                                        "__html": message.summary
                                    }}
                                />
                            </div>
                        )}
                        {children}
                        {auth !== undefined && auth.showTryAnotherWayLink && showAnotherWayIfPresent && (
                            <form
                                id="kc-select-try-another-way-form"
                                action={url.loginAction}
                                method="post"
                                className={clsx(displayWide && getClassName("kcContentWrapperClass"))}
                            >
                                <div
                                    className={clsx(
                                        displayWide && [getClassName("kcFormSocialAccountContentClass"), getClassName("kcFormSocialAccountClass")]
                                    )}
                                >
                                    <div className={getClassName("kcFormGroupClass")}>
                                        <input type="hidden" name="tryAnotherWay" value="on" />
                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                        <a
                                            href="#"
                                            id="try-another-way"
                                            onClick={() => {
                                                document.forms["kc-select-try-another-way-form" as never].submit();
                                                return false;
                                            }}
                                        >
                                            {msg("doTryAnotherWay")}
                                        </a>
                                    </div>
                                </div>
                            </form>
                        )}
                        {displayInfo && (
                            <div id="kc-info" className={getClassName("kcSignUpClass")}>
                                <div id="kc-info-wrapper" className={getClassName("kcInfoAreaWrapperClass")}>
                                    {infoNode}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
