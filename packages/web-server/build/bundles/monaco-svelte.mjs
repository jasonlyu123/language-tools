import { createSystem } from '@typescript/vfs';
import ts from 'typescript';
import { createDataProvider } from 'svelte-language-server/src/plugins/html/dataProvider';
import { startServerCommon } from 'svelte-language-server/src/serverCommon';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// file generated from vscode-web-custom-data NPM package
var htmlData = {
    "version": 1.1,
    "tags": [
        {
            "name": "html",
            "description": {
                "kind": "markdown",
                "value": "The html element represents the root of an HTML document."
            },
            "attributes": [
                {
                    "name": "manifest",
                    "description": {
                        "kind": "markdown",
                        "value": "Specifies the URI of a resource manifest indicating resources that should be cached locally. See [Using the application cache](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache) for details."
                    }
                },
                {
                    "name": "version",
                    "description": "Specifies the version of the HTML [Document Type Definition](https://developer.mozilla.org/en-US/docs/Glossary/DTD \"Document Type Definition: In HTML, the doctype is the required \"<!DOCTYPE html>\" preamble found at the top of all documents. Its sole purpose is to prevent a browser from switching into so-called “quirks mode” when rendering a document; that is, the \"<!DOCTYPE html>\" doctype ensures that the browser makes a best-effort attempt at following the relevant specifications, rather than using a different rendering mode that is incompatible with some specifications.\") that governs the current document. This attribute is not needed, because it is redundant with the version information in the document type declaration."
                },
                {
                    "name": "xmlns",
                    "description": "Specifies the XML Namespace of the document. Default value is `\"http://www.w3.org/1999/xhtml\"`. This is required in documents parsed with XML parsers, and optional in text/html documents."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/html"
                }
            ]
        },
        {
            "name": "head",
            "description": {
                "kind": "markdown",
                "value": "The head element represents a collection of metadata for the Document."
            },
            "attributes": [
                {
                    "name": "profile",
                    "description": "The URIs of one or more metadata profiles, separated by white space."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/head"
                }
            ]
        },
        {
            "name": "title",
            "description": {
                "kind": "markdown",
                "value": "The title element represents the document's title or name. Authors should use titles that identify their documents even when they are used out of context, for example in a user's history or bookmarks, or in search results. The document's title is often different from its first heading, since the first heading does not have to stand alone when taken out of context."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/title"
                }
            ]
        },
        {
            "name": "base",
            "description": {
                "kind": "markdown",
                "value": "The base element allows authors to specify the document base URL for the purposes of resolving relative URLs, and the name of the default browsing context for the purposes of following hyperlinks. The element does not represent any content beyond this information."
            },
            "attributes": [
                {
                    "name": "href",
                    "description": {
                        "kind": "markdown",
                        "value": "The base URL to be used throughout the document for relative URL addresses. If this attribute is specified, this element must come before any other elements with attributes whose values are URLs. Absolute and relative URLs are allowed."
                    }
                },
                {
                    "name": "target",
                    "description": {
                        "kind": "markdown",
                        "value": "A name or keyword indicating the default location to display the result when hyperlinks or forms cause navigation, for elements that do not have an explicit target reference. It is a name of, or keyword for, a _browsing context_ (for example: tab, window, or inline frame). The following keywords have special meanings:\n\n*   `_self`: Load the result into the same browsing context as the current one. This value is the default if the attribute is not specified.\n*   `_blank`: Load the result into a new unnamed browsing context.\n*   `_parent`: Load the result into the parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.\n*   `_top`: Load the result into the top-level browsing context (that is, the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`.\n\nIf this attribute is specified, this element must come before any other elements with attributes whose values are URLs."
                    }
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/base"
                }
            ]
        },
        {
            "name": "link",
            "description": {
                "kind": "markdown",
                "value": "The link element allows authors to link their document to other resources."
            },
            "attributes": [
                {
                    "name": "href",
                    "description": {
                        "kind": "markdown",
                        "value": "This attribute specifies the [URL](https://developer.mozilla.org/en-US/docs/Glossary/URL \"URL: Uniform Resource Locator (URL) is a text string specifying where a resource can be found on the Internet.\") of the linked resource. A URL can be absolute or relative."
                    }
                },
                {
                    "name": "crossorigin",
                    "valueSet": "xo",
                    "description": {
                        "kind": "markdown",
                        "value": "This enumerated attribute indicates whether [CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS \"CORS: CORS (Cross-Origin Resource Sharing) is a system, consisting of transmitting HTTP headers, that determines whether browsers block frontend JavaScript code from accessing responses for cross-origin requests.\") must be used when fetching the resource. [CORS-enabled images](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_Enabled_Image) can be reused in the [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas \"Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.\") element without being _tainted_. The allowed values are:\n\n`anonymous`\n\nA cross-origin request (i.e. with an [`Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin \"The Origin request header indicates where a fetch originates from. It doesn't include any path information, but only the server name. It is sent with CORS requests, as well as with POST requests. It is similar to the Referer header, but, unlike this header, it doesn't disclose the whole path.\") HTTP header) is performed, but no credential is sent (i.e. no cookie, X.509 certificate, or HTTP Basic authentication). If the server does not give credentials to the origin site (by not setting the [`Access-Control-Allow-Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin \"The Access-Control-Allow-Origin response header indicates whether the response can be shared with requesting code from the given origin.\") HTTP header) the image will be tainted and its usage restricted.\n\n`use-credentials`\n\nA cross-origin request (i.e. with an `Origin` HTTP header) is performed along with a credential sent (i.e. a cookie, certificate, and/or HTTP Basic authentication is performed). If the server does not give credentials to the origin site (through [`Access-Control-Allow-Credentials`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials \"The Access-Control-Allow-Credentials response header tells browsers whether to expose the response to frontend JavaScript code when the request's credentials mode (Request.credentials) is \"include\".\") HTTP header), the resource will be _tainted_ and its usage restricted.\n\nIf the attribute is not present, the resource is fetched without a [CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS \"CORS: CORS (Cross-Origin Resource Sharing) is a system, consisting of transmitting HTTP headers, that determines whether browsers block frontend JavaScript code from accessing responses for cross-origin requests.\") request (i.e. without sending the `Origin` HTTP header), preventing its non-tainted usage. If invalid, it is handled as if the enumerated keyword **anonymous** was used. See [CORS settings attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for additional information."
                    }
                },
                {
                    "name": "rel",
                    "description": {
                        "kind": "markdown",
                        "value": "This attribute names a relationship of the linked document to the current document. The attribute must be a space-separated list of the [link types values](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types)."
                    }
                },
                {
                    "name": "media",
                    "description": {
                        "kind": "markdown",
                        "value": "This attribute specifies the media that the linked resource applies to. Its value must be a media type / [media query](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_queries). This attribute is mainly useful when linking to external stylesheets — it allows the user agent to pick the best adapted one for the device it runs on.\n\n**Notes:**\n\n*   In HTML 4, this can only be a simple white-space-separated list of media description literals, i.e., [media types and groups](https://developer.mozilla.org/en-US/docs/Web/CSS/@media), where defined and allowed as values for this attribute, such as `print`, `screen`, `aural`, `braille`. HTML5 extended this to any kind of [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_queries), which are a superset of the allowed values of HTML 4.\n*   Browsers not supporting [CSS3 Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_queries) won't necessarily recognize the adequate link; do not forget to set fallback links, the restricted set of media queries defined in HTML 4."
                    }
                },
                {
                    "name": "hreflang",
                    "description": {
                        "kind": "markdown",
                        "value": "This attribute indicates the language of the linked resource. It is purely advisory. Allowed values are determined by [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt). Use this attribute only if the [`href`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href) attribute is present."
                    }
                },
                {
                    "name": "type",
                    "description": {
                        "kind": "markdown",
                        "value": "This attribute is used to define the type of the content linked to. The value of the attribute should be a MIME type such as **text/html**, **text/css**, and so on. The common use of this attribute is to define the type of stylesheet being referenced (such as **text/css**), but given that CSS is the only stylesheet language used on the web, not only is it possible to omit the `type` attribute, but is actually now recommended practice. It is also used on `rel=\"preload\"` link types, to make sure the browser only downloads file types that it supports."
                    }
                },
                {
                    "name": "sizes",
                    "description": {
                        "kind": "markdown",
                        "value": "This attribute defines the sizes of the icons for visual media contained in the resource. It must be present only if the [`rel`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#attr-rel) contains a value of `icon` or a non-standard type such as Apple's `apple-touch-icon`. It may have the following values:\n\n*   `any`, meaning that the icon can be scaled to any size as it is in a vector format, like `image/svg+xml`.\n*   a white-space separated list of sizes, each in the format `_<width in pixels>_x_<height in pixels>_` or `_<width in pixels>_X_<height in pixels>_`. Each of these sizes must be contained in the resource.\n\n**Note:** Most icon formats are only able to store one single icon; therefore most of the time the [`sizes`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#attr-sizes) contains only one entry. MS's ICO format does, as well as Apple's ICNS. ICO is more ubiquitous; you should definitely use it."
                    }
                },
                {
                    "name": "as",
                    "description": "This attribute is only used when `rel=\"preload\"` or `rel=\"prefetch\"` has been set on the `<link>` element. It specifies the type of content being loaded by the `<link>`, which is necessary for content prioritization, request matching, application of correct [content security policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP), and setting of correct [`Accept`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept \"The Accept request HTTP header advertises which content types, expressed as MIME types, the client is able to understand. Using content negotiation, the server then selects one of the proposals, uses it and informs the client of its choice with the Content-Type response header. Browsers set adequate values for this header depending on the context where the request is done: when fetching a CSS stylesheet a different value is set for the request than when fetching an image, video or a script.\") request header."
                },
                {
                    "name": "importance",
                    "description": "Indicates the relative importance of the resource. Priority hints are delegated using the values:"
                },
                {
                    "name": "importance",
                    "description": "**`auto`**: Indicates **no preference**. The browser may use its own heuristics to decide the priority of the resource.\n\n**`high`**: Indicates to the browser that the resource is of **high** priority.\n\n**`low`**: Indicates to the browser that the resource is of **low** priority.\n\n**Note:** The `importance` attribute may only be used for the `<link>` element if `rel=\"preload\"` or `rel=\"prefetch\"` is present."
                },
                {
                    "name": "integrity",
                    "description": "Contains inline metadata — a base64-encoded cryptographic hash of the resource (file) you’re telling the browser to fetch. The browser can use this to verify that the fetched resource has been delivered free of unexpected manipulation. See [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)."
                },
                {
                    "name": "referrerpolicy",
                    "description": "A string indicating which referrer to use when fetching the resource:\n\n*   `no-referrer` means that the [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer \"The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.\") header will not be sent.\n*   `no-referrer-when-downgrade` means that no [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer \"The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.\") header will be sent when navigating to an origin without TLS (HTTPS). This is a user agent’s default behavior, if no policy is otherwise specified.\n*   `origin` means that the referrer will be the origin of the page, which is roughly the scheme, the host, and the port.\n*   `origin-when-cross-origin` means that navigating to other origins will be limited to the scheme, the host, and the port, while navigating on the same origin will include the referrer's path.\n*   `unsafe-url` means that the referrer will include the origin and the path (but not the fragment, password, or username). This case is unsafe because it can leak origins and paths from TLS-protected resources to insecure origins."
                },
                {
                    "name": "title",
                    "description": "The `title` attribute has special semantics on the `<link>` element. When used on a `<link rel=\"stylesheet\">` it defines a [preferred or an alternate stylesheet](https://developer.mozilla.org/en-US/docs/Web/CSS/Alternative_style_sheets). Incorrectly using it may [cause the stylesheet to be ignored](https://developer.mozilla.org/en-US/docs/Correctly_Using_Titles_With_External_Stylesheets)."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/link"
                }
            ]
        },
        {
            "name": "meta",
            "description": {
                "kind": "markdown",
                "value": "The meta element represents various kinds of metadata that cannot be expressed using the title, base, link, style, and script elements."
            },
            "attributes": [
                {
                    "name": "name",
                    "description": {
                        "kind": "markdown",
                        "value": "This attribute defines the name of a piece of document-level metadata. It should not be set if one of the attributes [`itemprop`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#attr-itemprop), [`http-equiv`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-http-equiv) or [`charset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-charset) is also set.\n\nThis metadata name is associated with the value contained by the [`content`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-content) attribute. The possible values for the name attribute are:\n\n*   `application-name` which defines the name of the application running in the web page.\n    \n    **Note:**\n    \n    *   Browsers may use this to identify the application. It is different from the [`<title>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title \"The HTML Title element (<title>) defines the document's title that is shown in a browser's title bar or a page's tab.\") element, which usually contain the application name, but may also contain information like the document name or a status.\n    *   Simple web pages shouldn't define an application-name.\n    \n*   `author` which defines the name of the document's author.\n*   `description` which contains a short and accurate summary of the content of the page. Several browsers, like Firefox and Opera, use this as the default description of bookmarked pages.\n*   `generator` which contains the identifier of the software that generated the page.\n*   `keywords` which contains words relevant to the page's content separated by commas.\n*   `referrer` which controls the [`Referer` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) attached to requests sent from the document:\n    \n    Values for the `content` attribute of `<meta name=\"referrer\">`\n    \n    `no-referrer`\n    \n    Do not send a HTTP `Referrer` header.\n    \n    `origin`\n    \n    Send the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) of the document.\n    \n    `no-referrer-when-downgrade`\n    \n    Send the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) as a referrer to URLs as secure as the current page, (https→https), but does not send a referrer to less secure URLs (https→http). This is the default behaviour.\n    \n    `origin-when-cross-origin`\n    \n    Send the full URL (stripped of parameters) for same-origin requests, but only send the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) for other cases.\n    \n    `same-origin`\n    \n    A referrer will be sent for [same-site origins](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy), but cross-origin requests will contain no referrer information.\n    \n    `strict-origin`\n    \n    Only send the origin of the document as the referrer to a-priori as-much-secure destination (HTTPS->HTTPS), but don't send it to a less secure destination (HTTPS->HTTP).\n    \n    `strict-origin-when-cross-origin`\n    \n    Send a full URL when performing a same-origin request, only send the origin of the document to a-priori as-much-secure destination (HTTPS->HTTPS), and send no header to a less secure destination (HTTPS->HTTP).\n    \n    `unsafe-URL`\n    \n    Send the full URL (stripped of parameters) for same-origin or cross-origin requests.\n    \n    **Notes:**\n    \n    *   Some browsers support the deprecated values of `always`, `default`, and `never` for referrer.\n    *   Dynamically inserting `<meta name=\"referrer\">` (with [`document.write`](https://developer.mozilla.org/en-US/docs/Web/API/Document/write) or [`appendChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)) makes the referrer behaviour unpredictable.\n    *   When several conflicting policies are defined, the no-referrer policy is applied.\n    \n\nThis attribute may also have a value taken from the extended list defined on [WHATWG Wiki MetaExtensions page](https://wiki.whatwg.org/wiki/MetaExtensions). Although none have been formally accepted yet, a few commonly used names are:\n\n*   `creator` which defines the name of the creator of the document, such as an organization or institution. If there are more than one, several [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta \"The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.\") elements should be used.\n*   `googlebot`, a synonym of `robots`, is only followed by Googlebot (the indexing crawler for Google).\n*   `publisher` which defines the name of the document's publisher.\n*   `robots` which defines the behaviour that cooperative crawlers, or \"robots\", should use with the page. It is a comma-separated list of the values below:\n    \n    Values for the content of `<meta name=\"robots\">`\n    \n    Value\n    \n    Description\n    \n    Used by\n    \n    `index`\n    \n    Allows the robot to index the page (default).\n    \n    All\n    \n    `noindex`\n    \n    Requests the robot to not index the page.\n    \n    All\n    \n    `follow`\n    \n    Allows the robot to follow the links on the page (default).\n    \n    All\n    \n    `nofollow`\n    \n    Requests the robot to not follow the links on the page.\n    \n    All\n    \n    `none`\n    \n    Equivalent to `noindex, nofollow`\n    \n    [Google](https://support.google.com/webmasters/answer/79812)\n    \n    `noodp`\n    \n    Prevents using the [Open Directory Project](https://www.dmoz.org/) description, if any, as the page description in search engine results.\n    \n    [Google](https://support.google.com/webmasters/answer/35624#nodmoz), [Yahoo](https://help.yahoo.com/kb/search-for-desktop/meta-tags-robotstxt-yahoo-search-sln2213.html#cont5), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)\n    \n    `noarchive`\n    \n    Requests the search engine not to cache the page content.\n    \n    [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives), [Yahoo](https://help.yahoo.com/kb/search-for-desktop/SLN2213.html), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)\n    \n    `nosnippet`\n    \n    Prevents displaying any description of the page in search engine results.\n    \n    [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)\n    \n    `noimageindex`\n    \n    Requests this page not to appear as the referring page of an indexed image.\n    \n    [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives)\n    \n    `nocache`\n    \n    Synonym of `noarchive`.\n    \n    [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)\n    \n    **Notes:**\n    \n    *   Only cooperative robots follow these rules. Do not expect to prevent e-mail harvesters with them.\n    *   The robot still needs to access the page in order to read these rules. To prevent bandwidth consumption, use a _[robots.txt](https://developer.mozilla.org/en-US/docs/Glossary/robots.txt \"robots.txt: Robots.txt is a file which is usually placed in the root of any website. It decides whether crawlers are permitted or forbidden access to the web site.\")_ file.\n    *   If you want to remove a page, `noindex` will work, but only after the robot visits the page again. Ensure that the `robots.txt` file is not preventing revisits.\n    *   Some values are mutually exclusive, like `index` and `noindex`, or `follow` and `nofollow`. In these cases the robot's behaviour is undefined and may vary between them.\n    *   Some crawler robots, like Google, Yahoo and Bing, support the same values for the HTTP header `X-Robots-Tag`; this allows non-HTML documents like images to use these rules.\n    \n*   `slurp`, is a synonym of `robots`, but only for Slurp - the crawler for Yahoo Search.\n*   `viewport`, which gives hints about the size of the initial size of the [viewport](https://developer.mozilla.org/en-US/docs/Glossary/viewport \"viewport: A viewport represents a polygonal (normally rectangular) area in computer graphics that is currently being viewed. In web browser terms, it refers to the part of the document you're viewing which is currently visible in its window (or the screen, if the document is being viewed in full screen mode). Content outside the viewport is not visible onscreen until scrolled into view.\"). Used by mobile devices only.\n    \n    Values for the content of `<meta name=\"viewport\">`\n    \n    Value\n    \n    Possible subvalues\n    \n    Description\n    \n    `width`\n    \n    A positive integer number, or the text `device-width`\n    \n    Defines the pixel width of the viewport that you want the web site to be rendered at.\n    \n    `height`\n    \n    A positive integer, or the text `device-height`\n    \n    Defines the height of the viewport. Not used by any browser.\n    \n    `initial-scale`\n    \n    A positive number between `0.0` and `10.0`\n    \n    Defines the ratio between the device width (`device-width` in portrait mode or `device-height` in landscape mode) and the viewport size.\n    \n    `maximum-scale`\n    \n    A positive number between `0.0` and `10.0`\n    \n    Defines the maximum amount to zoom in. It must be greater or equal to the `minimum-scale` or the behaviour is undefined. Browser settings can ignore this rule and iOS10+ ignores it by default.\n    \n    `minimum-scale`\n    \n    A positive number between `0.0` and `10.0`\n    \n    Defines the minimum zoom level. It must be smaller or equal to the `maximum-scale` or the behaviour is undefined. Browser settings can ignore this rule and iOS10+ ignores it by default.\n    \n    `user-scalable`\n    \n    `yes` or `no`\n    \n    If set to `no`, the user is not able to zoom in the webpage. The default is `yes`. Browser settings can ignore this rule, and iOS10+ ignores it by default.\n    \n    Specification\n    \n    Status\n    \n    Comment\n    \n    [CSS Device Adaptation  \n    The definition of '<meta name=\"viewport\">' in that specification.](https://drafts.csswg.org/css-device-adapt/#viewport-meta)\n    \n    Working Draft\n    \n    Non-normatively describes the Viewport META element\n    \n    See also: [`@viewport`](https://developer.mozilla.org/en-US/docs/Web/CSS/@viewport \"The @viewport CSS at-rule lets you configure the viewport through which the document is viewed. It's primarily used for mobile devices, but is also used by desktop browsers that support features like \"snap to edge\" (such as Microsoft Edge).\")\n    \n    **Notes:**\n    \n    *   Though unstandardized, this declaration is respected by most mobile browsers due to de-facto dominance.\n    *   The default values may vary between devices and browsers.\n    *   To learn about this declaration in Firefox for Mobile, see [this article](https://developer.mozilla.org/en-US/docs/Mobile/Viewport_meta_tag \"Mobile/Viewport meta tag\")."
                    }
                },
                {
                    "name": "http-equiv",
                    "description": {
                        "kind": "markdown",
                        "value": "Defines a pragma directive. The attribute is named `**http-equiv**(alent)` because all the allowed values are names of particular HTTP headers:\n\n*   `\"content-language\"`  \n    Defines the default language of the page. It can be overridden by the [lang](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) attribute on any element.\n    \n    **Warning:** Do not use this value, as it is obsolete. Prefer the `lang` attribute on the [`<html>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html \"The HTML <html> element represents the root (top-level element) of an HTML document, so it is also referred to as the root element. All other elements must be descendants of this element.\") element.\n    \n*   `\"content-security-policy\"`  \n    Allows page authors to define a [content policy](https://developer.mozilla.org/en-US/docs/Web/Security/CSP/CSP_policy_directives) for the current page. Content policies mostly specify allowed server origins and script endpoints which help guard against cross-site scripting attacks.\n*   `\"content-type\"`  \n    Defines the [MIME type](https://developer.mozilla.org/en-US/docs/Glossary/MIME_type) of the document, followed by its character encoding. It follows the same syntax as the HTTP `content-type` entity-header field, but as it is inside a HTML page, most values other than `text/html` are impossible. Therefore the valid syntax for its `content` is the string '`text/html`' followed by a character set with the following syntax: '`; charset=_IANAcharset_`', where `IANAcharset` is the _preferred MIME name_ for a character set as [defined by the IANA.](https://www.iana.org/assignments/character-sets)\n    \n    **Warning:** Do not use this value, as it is obsolete. Use the [`charset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-charset) attribute on the [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta \"The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.\") element.\n    \n    **Note:** As [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta \"The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.\") can't change documents' types in XHTML or HTML5's XHTML serialization, never set the MIME type to an XHTML MIME type with `<meta>`.\n    \n*   `\"refresh\"`  \n    This instruction specifies:\n    *   The number of seconds until the page should be reloaded - only if the [`content`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-content) attribute contains a positive integer.\n    *   The number of seconds until the page should redirect to another - only if the [`content`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-content) attribute contains a positive integer followed by the string '`;url=`', and a valid URL.\n*   `\"set-cookie\"`  \n    Defines a [cookie](https://developer.mozilla.org/en-US/docs/cookie) for the page. Its content must follow the syntax defined in the [IETF HTTP Cookie Specification](https://tools.ietf.org/html/draft-ietf-httpstate-cookie-14).\n    \n    **Warning:** Do not use this instruction, as it is obsolete. Use the HTTP header [`Set-Cookie`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie) instead."
                    }
                },
                {
                    "name": "content",
                    "description": {
                        "kind": "markdown",
                        "value": "This attribute contains the value for the [`http-equiv`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-http-equiv) or [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-name) attribute, depending on which is used."
                    }
                },
                {
                    "name": "charset",
                    "description": {
                        "kind": "markdown",
                        "value": "This attribute declares the page's character encoding. It must contain a [standard IANA MIME name for character encodings](https://www.iana.org/assignments/character-sets). Although the standard doesn't request a specific encoding, it suggests:\n\n*   Authors are encouraged to use [`UTF-8`](https://developer.mozilla.org/en-US/docs/Glossary/UTF-8).\n*   Authors should not use ASCII-incompatible encodings to avoid security risk: browsers not supporting them may interpret harmful content as HTML. This happens with the `JIS_C6226-1983`, `JIS_X0212-1990`, `HZ-GB-2312`, `JOHAB`, the ISO-2022 family and the EBCDIC family.\n\n**Note:** ASCII-incompatible encodings are those that don't map the 8-bit code points `0x20` to `0x7E` to the `0x0020` to `0x007E` Unicode code points)\n\n*   Authors **must not** use `CESU-8`, `UTF-7`, `BOCU-1` and/or `SCSU` as [cross-site scripting](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting) attacks with these encodings have been demonstrated.\n*   Authors should not use `UTF-32` because not all HTML5 encoding algorithms can distinguish it from `UTF-16`.\n\n**Notes:**\n\n*   The declared character encoding must match the one the page was saved with to avoid garbled characters and security holes.\n*   The [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta \"The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.\") element declaring the encoding must be inside the [`<head>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head \"The HTML <head> element provides general information (metadata) about the document, including its title and links to its scripts and style sheets.\") element and **within the first 1024 bytes** of the HTML as some browsers only look at those bytes before choosing an encoding.\n*   This [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta \"The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.\") element is only one part of the [algorithm to determine a page's character set](https://www.whatwg.org/specs/web-apps/current-work/multipage/parsing.html#encoding-sniffing-algorithm \"Algorithm charset page\"). The [`Content-Type` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) and any [Byte-Order Marks](https://developer.mozilla.org/en-US/docs/Glossary/Byte-Order_Mark \"The definition of that term (Byte-Order Marks) has not been written yet; please consider contributing it!\") override this element.\n*   It is strongly recommended to define the character encoding. If a page's encoding is undefined, cross-scripting techniques are possible, such as the [`UTF-7` fallback cross-scripting technique](https://code.google.com/p/doctype-mirror/wiki/ArticleUtf7).\n*   The [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta \"The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.\") element with a `charset` attribute is a synonym for the pre-HTML5 `<meta http-equiv=\"Content-Type\" content=\"text/html; charset=_IANAcharset_\">`, where _`IANAcharset`_ contains the value of the equivalent [`charset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-charset) attribute. This syntax is still allowed, although no longer recommended."
                    }
                },
                {
                    "name": "scheme",
                    "description": "This attribute defines the scheme in which metadata is described. A scheme is a context leading to the correct interpretations of the [`content`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-content) value, like a format.\n\n**Warning:** Do not use this value, as it is obsolete. There is no replacement as there was no real usage for it."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/meta"
                }
            ]
        },
        {
            "name": "style",
            "description": {
                "kind": "markdown",
                "value": "The style element allows authors to embed style information in their documents. The style element is one of several inputs to the styling processing model. The element does not represent content for the user."
            },
            "attributes": [
                {
                    "name": "media",
                    "description": {
                        "kind": "markdown",
                        "value": "This attribute defines which media the style should be applied to. Its value is a [media query](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Media_queries), which defaults to `all` if the attribute is missing."
                    }
                },
                {
                    "name": "nonce",
                    "description": {
                        "kind": "markdown",
                        "value": "A cryptographic nonce (number used once) used to whitelist inline styles in a [style-src Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src). The server must generate a unique nonce value each time it transmits a policy. It is critical to provide a nonce that cannot be guessed as bypassing a resource’s policy is otherwise trivial."
                    }
                },
                {
                    "name": "type",
                    "description": {
                        "kind": "markdown",
                        "value": "This attribute defines the styling language as a MIME type (charset should not be specified). This attribute is optional and defaults to `text/css` if it is not specified — there is very little reason to include this in modern web documents."
                    }
                },
                {
                    "name": "scoped",
                    "valueSet": "v"
                },
                {
                    "name": "title",
                    "description": "This attribute specifies [alternative style sheet](https://developer.mozilla.org/en-US/docs/Web/CSS/Alternative_style_sheets) sets."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/style"
                }
            ]
        },
        {
            "name": "body",
            "description": {
                "kind": "markdown",
                "value": "The body element represents the content of the document."
            },
            "attributes": [
                {
                    "name": "onafterprint",
                    "description": {
                        "kind": "markdown",
                        "value": "Function to call after the user has printed the document."
                    }
                },
                {
                    "name": "onbeforeprint",
                    "description": {
                        "kind": "markdown",
                        "value": "Function to call when the user requests printing of the document."
                    }
                },
                {
                    "name": "onbeforeunload",
                    "description": {
                        "kind": "markdown",
                        "value": "Function to call when the document is about to be unloaded."
                    }
                },
                {
                    "name": "onhashchange",
                    "description": {
                        "kind": "markdown",
                        "value": "Function to call when the fragment identifier part (starting with the hash (`'#'`) character) of the document's current address has changed."
                    }
                },
                {
                    "name": "onlanguagechange",
                    "description": {
                        "kind": "markdown",
                        "value": "Function to call when the preferred languages changed."
                    }
                },
                {
                    "name": "onmessage",
                    "description": {
                        "kind": "markdown",
                        "value": "Function to call when the document has received a message."
                    }
                },
                {
                    "name": "onoffline",
                    "description": {
                        "kind": "markdown",
                        "value": "Function to call when network communication has failed."
                    }
                },
                {
                    "name": "ononline",
                    "description": {
                        "kind": "markdown",
                        "value": "Function to call when network communication has been restored."
                    }
                },
                {
                    "name": "onpagehide"
                },
                {
                    "name": "onpageshow"
                },
                {
                    "name": "onpopstate",
                    "description": {
                        "kind": "markdown",
                        "value": "Function to call when the user has navigated session history."
                    }
                },
                {
                    "name": "onstorage",
                    "description": {
                        "kind": "markdown",
                        "value": "Function to call when the storage area has changed."
                    }
                },
                {
                    "name": "onunload",
                    "description": {
                        "kind": "markdown",
                        "value": "Function to call when the document is going away."
                    }
                },
                {
                    "name": "alink",
                    "description": "Color of text for hyperlinks when selected. _This method is non-conforming, use CSS [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color \"The color CSS property sets the foreground color value of an element's text and text decorations, and sets the currentcolor value.\") property in conjunction with the [`:active`](https://developer.mozilla.org/en-US/docs/Web/CSS/:active \"The :active CSS pseudo-class represents an element (such as a button) that is being activated by the user.\") pseudo-class instead._"
                },
                {
                    "name": "background",
                    "description": "URI of a image to use as a background. _This method is non-conforming, use CSS [`background`](https://developer.mozilla.org/en-US/docs/Web/CSS/background \"The background shorthand CSS property sets all background style properties at once, such as color, image, origin and size, or repeat method.\") property on the element instead._"
                },
                {
                    "name": "bgcolor",
                    "description": "Background color for the document. _This method is non-conforming, use CSS [`background-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color \"The background-color CSS property sets the background color of an element.\") property on the element instead._"
                },
                {
                    "name": "bottommargin",
                    "description": "The margin of the bottom of the body. _This method is non-conforming, use CSS [`margin-bottom`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-bottom \"The margin-bottom CSS property sets the margin area on the bottom of an element. A positive value places it farther from its neighbors, while a negative value places it closer.\") property on the element instead._"
                },
                {
                    "name": "leftmargin",
                    "description": "The margin of the left of the body. _This method is non-conforming, use CSS [`margin-left`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left \"The margin-left CSS property sets the margin area on the left side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.\") property on the element instead._"
                },
                {
                    "name": "link",
                    "description": "Color of text for unvisited hypertext links. _This method is non-conforming, use CSS [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color \"The color CSS property sets the foreground color value of an element's text and text decorations, and sets the currentcolor value.\") property in conjunction with the [`:link`](https://developer.mozilla.org/en-US/docs/Web/CSS/:link \"The :link CSS pseudo-class represents an element that has not yet been visited. It matches every unvisited <a>, <area>, or <link> element that has an href attribute.\") pseudo-class instead._"
                },
                {
                    "name": "onblur",
                    "description": "Function to call when the document loses focus."
                },
                {
                    "name": "onerror",
                    "description": "Function to call when the document fails to load properly."
                },
                {
                    "name": "onfocus",
                    "description": "Function to call when the document receives focus."
                },
                {
                    "name": "onload",
                    "description": "Function to call when the document has finished loading."
                },
                {
                    "name": "onredo",
                    "description": "Function to call when the user has moved forward in undo transaction history."
                },
                {
                    "name": "onresize",
                    "description": "Function to call when the document has been resized."
                },
                {
                    "name": "onundo",
                    "description": "Function to call when the user has moved backward in undo transaction history."
                },
                {
                    "name": "rightmargin",
                    "description": "The margin of the right of the body. _This method is non-conforming, use CSS [`margin-right`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right \"The margin-right CSS property sets the margin area on the right side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.\") property on the element instead._"
                },
                {
                    "name": "text",
                    "description": "Foreground color of text. _This method is non-conforming, use CSS [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color \"The color CSS property sets the foreground color value of an element's text and text decorations, and sets the currentcolor value.\") property on the element instead._"
                },
                {
                    "name": "topmargin",
                    "description": "The margin of the top of the body. _This method is non-conforming, use CSS [`margin-top`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-top \"The margin-top CSS property sets the margin area on the top of an element. A positive value places it farther from its neighbors, while a negative value places it closer.\") property on the element instead._"
                },
                {
                    "name": "vlink",
                    "description": "Color of text for visited hypertext links. _This method is non-conforming, use CSS [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color \"The color CSS property sets the foreground color value of an element's text and text decorations, and sets the currentcolor value.\") property in conjunction with the [`:visited`](https://developer.mozilla.org/en-US/docs/Web/CSS/:visited \"The :visited CSS pseudo-class represents links that the user has already visited. For privacy reasons, the styles that can be modified using this selector are very limited.\") pseudo-class instead._"
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/body"
                }
            ]
        },
        {
            "name": "article",
            "description": {
                "kind": "markdown",
                "value": "The article element represents a complete, or self-contained, composition in a document, page, application, or site and that is, in principle, independently distributable or reusable, e.g. in syndication. This could be a forum post, a magazine or newspaper article, a blog entry, a user-submitted comment, an interactive widget or gadget, or any other independent item of content. Each article should be identified, typically by including a heading (h1–h6 element) as a child of the article element."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/article"
                }
            ]
        },
        {
            "name": "section",
            "description": {
                "kind": "markdown",
                "value": "The section element represents a generic section of a document or application. A section, in this context, is a thematic grouping of content. Each section should be identified, typically by including a heading ( h1- h6 element) as a child of the section element."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/section"
                }
            ]
        },
        {
            "name": "nav",
            "description": {
                "kind": "markdown",
                "value": "The nav element represents a section of a page that links to other pages or to parts within the page: a section with navigation links."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/nav"
                }
            ]
        },
        {
            "name": "aside",
            "description": {
                "kind": "markdown",
                "value": "The aside element represents a section of a page that consists of content that is tangentially related to the content around the aside element, and which could be considered separate from that content. Such sections are often represented as sidebars in printed typography."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/aside"
                }
            ]
        },
        {
            "name": "h1",
            "description": {
                "kind": "markdown",
                "value": "The h1 element represents a section heading."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements"
                }
            ]
        },
        {
            "name": "h2",
            "description": {
                "kind": "markdown",
                "value": "The h2 element represents a section heading."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements"
                }
            ]
        },
        {
            "name": "h3",
            "description": {
                "kind": "markdown",
                "value": "The h3 element represents a section heading."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements"
                }
            ]
        },
        {
            "name": "h4",
            "description": {
                "kind": "markdown",
                "value": "The h4 element represents a section heading."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements"
                }
            ]
        },
        {
            "name": "h5",
            "description": {
                "kind": "markdown",
                "value": "The h5 element represents a section heading."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements"
                }
            ]
        },
        {
            "name": "h6",
            "description": {
                "kind": "markdown",
                "value": "The h6 element represents a section heading."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements"
                }
            ]
        },
        {
            "name": "header",
            "description": {
                "kind": "markdown",
                "value": "The header element represents introductory content for its nearest ancestor sectioning content or sectioning root element. A header typically contains a group of introductory or navigational aids. When the nearest ancestor sectioning content or sectioning root element is the body element, then it applies to the whole page."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/header"
                }
            ]
        },
        {
            "name": "footer",
            "description": {
                "kind": "markdown",
                "value": "The footer element represents a footer for its nearest ancestor sectioning content or sectioning root element. A footer typically contains information about its section such as who wrote it, links to related documents, copyright data, and the like."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/footer"
                }
            ]
        },
        {
            "name": "address",
            "description": {
                "kind": "markdown",
                "value": "The address element represents the contact information for its nearest article or body element ancestor. If that is the body element, then the contact information applies to the document as a whole."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/address"
                }
            ]
        },
        {
            "name": "p",
            "description": {
                "kind": "markdown",
                "value": "The p element represents a paragraph."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/p"
                }
            ]
        },
        {
            "name": "hr",
            "description": {
                "kind": "markdown",
                "value": "The hr element represents a paragraph-level thematic break, e.g. a scene change in a story, or a transition to another topic within a section of a reference book."
            },
            "attributes": [
                {
                    "name": "align",
                    "description": "Sets the alignment of the rule on the page. If no value is specified, the default value is `left`."
                },
                {
                    "name": "color",
                    "description": "Sets the color of the rule through color name or hexadecimal value."
                },
                {
                    "name": "noshade",
                    "description": "Sets the rule to have no shading."
                },
                {
                    "name": "size",
                    "description": "Sets the height, in pixels, of the rule."
                },
                {
                    "name": "width",
                    "description": "Sets the length of the rule on the page through a pixel or percentage value."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/hr"
                }
            ]
        },
        {
            "name": "pre",
            "description": {
                "kind": "markdown",
                "value": "The pre element represents a block of preformatted text, in which structure is represented by typographic conventions rather than by elements."
            },
            "attributes": [
                {
                    "name": "cols",
                    "description": "Contains the _preferred_ count of characters that a line should have. It was a non-standard synonym of [`width`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre#attr-width). To achieve such an effect, use CSS [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width \"The width CSS property sets an element's width. By default it sets the width of the content area, but if box-sizing is set to border-box, it sets the width of the border area.\") instead."
                },
                {
                    "name": "width",
                    "description": "Contains the _preferred_ count of characters that a line should have. Though technically still implemented, this attribute has no visual effect; to achieve such an effect, use CSS [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width \"The width CSS property sets an element's width. By default it sets the width of the content area, but if box-sizing is set to border-box, it sets the width of the border area.\") instead."
                },
                {
                    "name": "wrap",
                    "description": "Is a _hint_ indicating how the overflow must happen. In modern browser this hint is ignored and no visual effect results in its present; to achieve such an effect, use CSS [`white-space`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space \"The white-space CSS property sets how white space inside an element is handled.\") instead."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/pre"
                }
            ]
        },
        {
            "name": "blockquote",
            "description": {
                "kind": "markdown",
                "value": "The blockquote element represents content that is quoted from another source, optionally with a citation which must be within a footer or cite element, and optionally with in-line changes such as annotations and abbreviations."
            },
            "attributes": [
                {
                    "name": "cite",
                    "description": {
                        "kind": "markdown",
                        "value": "A URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote."
                    }
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/blockquote"
                }
            ]
        },
        {
            "name": "ol",
            "description": {
                "kind": "markdown",
                "value": "The ol element represents a list of items, where the items have been intentionally ordered, such that changing the order would change the meaning of the document."
            },
            "attributes": [
                {
                    "name": "reversed",
                    "valueSet": "v",
                    "description": {
                        "kind": "markdown",
                        "value": "This Boolean attribute specifies that the items of the list are specified in reversed order."
                    }
                },
                {
                    "name": "start",
                    "description": {
                        "kind": "markdown",
                        "value": "This integer attribute specifies the start value for numbering the individual list items. Although the ordering type of list elements might be Roman numerals, such as XXXI, or letters, the value of start is always represented as a number. To start numbering elements from the letter \"C\", use `<ol start=\"3\">`.\n\n**Note**: This attribute was deprecated in HTML4, but reintroduced in HTML5."
                    }
                },
                {
                    "name": "type",
                    "valueSet": "lt",
                    "description": {
                        "kind": "markdown",
                        "value": "Indicates the numbering type:\n\n*   `'a'` indicates lowercase letters,\n*   `'A'` indicates uppercase letters,\n*   `'i'` indicates lowercase Roman numerals,\n*   `'I'` indicates uppercase Roman numerals,\n*   and `'1'` indicates numbers (default).\n\nThe type set is used for the entire list unless a different [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li#attr-type) attribute is used within an enclosed [`<li>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li \"The HTML <li> element is used to represent an item in a list. It must be contained in a parent element: an ordered list (<ol>), an unordered list (<ul>), or a menu (<menu>). In menus and unordered lists, list items are usually displayed using bullet points. In ordered lists, they are usually displayed with an ascending counter on the left, such as a number or letter.\") element.\n\n**Note:** This attribute was deprecated in HTML4, but reintroduced in HTML5.\n\nUnless the value of the list number matters (e.g. in legal or technical documents where items are to be referenced by their number/letter), the CSS [`list-style-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type \"The list-style-type CSS property sets the marker (such as a disc, character, or custom counter style) of a list item element.\") property should be used instead."
                    }
                },
                {
                    "name": "compact",
                    "description": "This Boolean attribute hints that the list should be rendered in a compact style. The interpretation of this attribute depends on the user agent and it doesn't work in all browsers.\n\n**Warning:** Do not use this attribute, as it has been deprecated: the [`<ol>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol \"The HTML <ol> element represents an ordered list of items, typically rendered as a numbered list.\") element should be styled using [CSS](https://developer.mozilla.org/en-US/docs/CSS). To give an effect similar to the `compact` attribute, the [CSS](https://developer.mozilla.org/en-US/docs/CSS) property [`line-height`](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height \"The line-height CSS property sets the amount of space used for lines, such as in text. On block-level elements, it specifies the minimum height of line boxes within the element. On non-replaced inline elements, it specifies the height that is used to calculate line box height.\") can be used with a value of `80%`."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/ol"
                }
            ]
        },
        {
            "name": "ul",
            "description": {
                "kind": "markdown",
                "value": "The ul element represents a list of items, where the order of the items is not important — that is, where changing the order would not materially change the meaning of the document."
            },
            "attributes": [
                {
                    "name": "compact",
                    "description": "This Boolean attribute hints that the list should be rendered in a compact style. The interpretation of this attribute depends on the user agent and it doesn't work in all browsers.\n\n**Usage note: **Do not use this attribute, as it has been deprecated: the [`<ul>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul \"The HTML <ul> element represents an unordered list of items, typically rendered as a bulleted list.\") element should be styled using [CSS](https://developer.mozilla.org/en-US/docs/CSS). To give a similar effect as the `compact` attribute, the [CSS](https://developer.mozilla.org/en-US/docs/CSS) property [line-height](https://developer.mozilla.org/en-US/docs/CSS/line-height) can be used with a value of `80%`."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/ul"
                }
            ]
        },
        {
            "name": "li",
            "description": {
                "kind": "markdown",
                "value": "The li element represents a list item. If its parent element is an ol, ul, or menu element, then the element is an item of the parent element's list, as defined for those elements. Otherwise, the list item has no defined list-related relationship to any other li element."
            },
            "attributes": [
                {
                    "name": "value",
                    "description": {
                        "kind": "markdown",
                        "value": "This integer attribute indicates the current ordinal value of the list item as defined by the [`<ol>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol \"The HTML <ol> element represents an ordered list of items, typically rendered as a numbered list.\") element. The only allowed value for this attribute is a number, even if the list is displayed with Roman numerals or letters. List items that follow this one continue numbering from the value set. The **value** attribute has no meaning for unordered lists ([`<ul>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul \"The HTML <ul> element represents an unordered list of items, typically rendered as a bulleted list.\")) or for menus ([`<menu>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu \"The HTML <menu> element represents a group of commands that a user can perform or activate. This includes both list menus, which might appear across the top of a screen, as well as context menus, such as those that might appear underneath a button after it has been clicked.\")).\n\n**Note**: This attribute was deprecated in HTML4, but reintroduced in HTML5.\n\n**Note:** Prior to Gecko 9.0, negative values were incorrectly converted to 0. Starting in Gecko 9.0 all integer values are correctly parsed."
                    }
                },
                {
                    "name": "type",
                    "description": "This character attribute indicates the numbering type:\n\n*   `a`: lowercase letters\n*   `A`: uppercase letters\n*   `i`: lowercase Roman numerals\n*   `I`: uppercase Roman numerals\n*   `1`: numbers\n\nThis type overrides the one used by its parent [`<ol>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol \"The HTML <ol> element represents an ordered list of items, typically rendered as a numbered list.\") element, if any.\n\n**Usage note:** This attribute has been deprecated: use the CSS [`list-style-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type \"The list-style-type CSS property sets the marker (such as a disc, character, or custom counter style) of a list item element.\") property instead."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/li"
                }
            ]
        },
        {
            "name": "dl",
            "description": {
                "kind": "markdown",
                "value": "The dl element represents an association list consisting of zero or more name-value groups (a description list). A name-value group consists of one or more names (dt elements) followed by one or more values (dd elements), ignoring any nodes other than dt and dd elements. Within a single dl element, there should not be more than one dt element for each name."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/dl"
                }
            ]
        },
        {
            "name": "dt",
            "description": {
                "kind": "markdown",
                "value": "The dt element represents the term, or name, part of a term-description group in a description list (dl element)."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/dt"
                }
            ]
        },
        {
            "name": "dd",
            "description": {
                "kind": "markdown",
                "value": "The dd element represents the description, definition, or value, part of a term-description group in a description list (dl element)."
            },
            "attributes": [
                {
                    "name": "nowrap",
                    "description": "If the value of this attribute is set to `yes`, the definition text will not wrap. The default value is `no`."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/dd"
                }
            ]
        },
        {
            "name": "figure",
            "description": {
                "kind": "markdown",
                "value": "The figure element represents some flow content, optionally with a caption, that is self-contained (like a complete sentence) and is typically referenced as a single unit from the main flow of the document."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/figure"
                }
            ]
        },
        {
            "name": "figcaption",
            "description": {
                "kind": "markdown",
                "value": "The figcaption element represents a caption or legend for the rest of the contents of the figcaption element's parent figure element, if any."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/figcaption"
                }
            ]
        },
        {
            "name": "main",
            "description": {
                "kind": "markdown",
                "value": "The main element represents the main content of the body of a document or application. The main content area consists of content that is directly related to or expands upon the central topic of a document or central functionality of an application."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/main"
                }
            ]
        },
        {
            "name": "div",
            "description": {
                "kind": "markdown",
                "value": "The div element has no special meaning at all. It represents its children. It can be used with the class, lang, and title attributes to mark up semantics common to a group of consecutive elements."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/div"
                }
            ]
        },
        {
            "name": "a",
            "description": {
                "kind": "markdown",
                "value": "If the a element has an href attribute, then it represents a hyperlink (a hypertext anchor) labeled by its contents."
            },
            "attributes": [
                {
                    "name": "href",
                    "description": {
                        "kind": "markdown",
                        "value": "Contains a URL or a URL fragment that the hyperlink points to."
                    }
                },
                {
                    "name": "target",
                    "description": {
                        "kind": "markdown",
                        "value": "Specifies where to display the linked URL. It is a name of, or keyword for, a _browsing context_: a tab, window, or `<iframe>`. The following keywords have special meanings:\n\n*   `_self`: Load the URL into the same browsing context as the current one. This is the default behavior.\n*   `_blank`: Load the URL into a new browsing context. This is usually a tab, but users can configure browsers to use new windows instead.\n*   `_parent`: Load the URL into the parent browsing context of the current one. If there is no parent, this behaves the same way as `_self`.\n*   `_top`: Load the URL into the top-level browsing context (that is, the \"highest\" browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this behaves the same way as `_self`.\n\n**Note:** When using `target`, consider adding `rel=\"noreferrer\"` to avoid exploitation of the `window.opener` API.\n\n**Note:** Linking to another page using `target=\"_blank\"` will run the new page on the same process as your page. If the new page is executing expensive JS, your page's performance may suffer. To avoid this use `rel=\"noopener\"`."
                    }
                },
                {
                    "name": "download",
                    "description": {
                        "kind": "markdown",
                        "value": "This attribute instructs browsers to download a URL instead of navigating to it, so the user will be prompted to save it as a local file. If the attribute has a value, it is used as the pre-filled file name in the Save prompt (the user can still change the file name if they want). There are no restrictions on allowed values, though `/` and `\\` are converted to underscores. Most file systems limit some punctuation in file names, and browsers will adjust the suggested name accordingly.\n\n**Notes:**\n\n*   This attribute only works for [same-origin URLs](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy).\n*   Although HTTP(s) URLs need to be in the same-origin, [`blob:` URLs](https://developer.mozilla.org/en-US/docs/Web/API/URL.createObjectURL) and [`data:` URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) are allowed so that content generated by JavaScript, such as pictures created in an image-editor Web app, can be downloaded.\n*   If the HTTP header [`Content-Disposition:`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition) gives a different filename than this attribute, the HTTP header takes priority over this attribute.\n*   If `Content-Disposition:` is set to `inline`, Firefox prioritizes `Content-Disposition`, like the filename case, while Chrome prioritizes the `download` attribute."
                    }
                },
                {
                    "name": "ping",
                    "description": {
                        "kind": "markdown",
                        "value": "Contains a space-separated list of URLs to which, when the hyperlink is followed, [`POST`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST \"The HTTP POST method sends data to the server. The type of the body of the request is indicated by the Content-Type header.\") requests with the body `PING` will be sent by the browser (in the background). Typically used for tracking."
                    }
                },
                {
                    "name": "rel",
                    "description": {
                        "kind": "markdown",
                        "value": "Specifies the relationship of the target object to the link object. The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types)."
                    }
                },
                {
                    "name": "hreflang",
                    "description": {
                        "kind": "markdown",
                        "value": "This attribute indicates the human language of the linked resource. It is purely advisory, with no built-in functionality. Allowed values are determined by [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt \"Tags for Identifying Languages\")."
                    }
                },
                {
                    "name": "type",
                    "description": {
                        "kind": "markdown",
                        "value": "Specifies the media type in the form of a [MIME type](https://developer.mozilla.org/en-US/docs/Glossary/MIME_type \"MIME type: A MIME type (now properly called \"media type\", but also sometimes \"content type\") is a string sent along with a file indicating the type of the file (describing the content format, for example, a sound file might be labeled audio/ogg, or an image file image/png).\") for the linked URL. It is purely advisory, with no built-in functionality."
                    }
                },
                {
                    "name": "referrerpolicy",
                    "description": "Indicates which [referrer](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) to send when fetching the URL:\n\n*   `'no-referrer'` means the `Referer:` header will not be sent.\n*   `'no-referrer-when-downgrade'` means no `Referer:` header will be sent when navigating to an origin without HTTPS. This is the default behavior.\n*   `'origin'` means the referrer will be the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) of the page, not including information after the domain.\n*   `'origin-when-cross-origin'` meaning that navigations to other origins will be limited to the scheme, the host and the port, while navigations on the same origin will include the referrer's path.\n*   `'strict-origin-when-cross-origin'`\n*   `'unsafe-url'` means the referrer will include the origin and path, but not the fragment, password, or username. This is unsafe because it can leak data from secure URLs to insecure ones."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/a"
                }
            ]
        },
        {
            "name": "em",
            "description": {
                "kind": "markdown",
                "value": "The em element represents stress emphasis of its contents."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/em"
                }
            ]
        },
        {
            "name": "strong",
            "description": {
                "kind": "markdown",
                "value": "The strong element represents strong importance, seriousness, or urgency for its contents."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/strong"
                }
            ]
        },
        {
            "name": "small",
            "description": {
                "kind": "markdown",
                "value": "The small element represents side comments such as small print."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/small"
                }
            ]
        },
        {
            "name": "s",
            "description": {
                "kind": "markdown",
                "value": "The s element represents contents that are no longer accurate or no longer relevant."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/s"
                }
            ]
        },
        {
            "name": "cite",
            "description": {
                "kind": "markdown",
                "value": "The cite element represents a reference to a creative work. It must include the title of the work or the name of the author(person, people or organization) or an URL reference, or a reference in abbreviated form as per the conventions used for the addition of citation metadata."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/cite"
                }
            ]
        },
        {
            "name": "q",
            "description": {
                "kind": "markdown",
                "value": "The q element represents some phrasing content quoted from another source."
            },
            "attributes": [
                {
                    "name": "cite",
                    "description": {
                        "kind": "markdown",
                        "value": "The value of this attribute is a URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote."
                    }
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/q"
                }
            ]
        },
        {
            "name": "dfn",
            "description": {
                "kind": "markdown",
                "value": "The dfn element represents the defining instance of a term. The paragraph, description list group, or section that is the nearest ancestor of the dfn element must also contain the definition(s) for the term given by the dfn element."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/dfn"
                }
            ]
        },
        {
            "name": "abbr",
            "description": {
                "kind": "markdown",
                "value": "The abbr element represents an abbreviation or acronym, optionally with its expansion. The title attribute may be used to provide an expansion of the abbreviation. The attribute, if specified, must contain an expansion of the abbreviation, and nothing else."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/abbr"
                }
            ]
        },
        {
            "name": "ruby",
            "description": {
                "kind": "markdown",
                "value": "The ruby element allows one or more spans of phrasing content to be marked with ruby annotations. Ruby annotations are short runs of text presented alongside base text, primarily used in East Asian typography as a guide for pronunciation or to include other annotations. In Japanese, this form of typography is also known as furigana. Ruby text can appear on either side, and sometimes both sides, of the base text, and it is possible to control its position using CSS. A more complete introduction to ruby can be found in the Use Cases & Exploratory Approaches for Ruby Markup document as well as in CSS Ruby Module Level 1. [RUBY-UC] [CSSRUBY]"
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/ruby"
                }
            ]
        },
        {
            "name": "rb",
            "description": {
                "kind": "markdown",
                "value": "The rb element marks the base text component of a ruby annotation. When it is the child of a ruby element, it doesn't represent anything itself, but its parent ruby element uses it as part of determining what it represents."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/rb"
                }
            ]
        },
        {
            "name": "rt",
            "description": {
                "kind": "markdown",
                "value": "The rt element marks the ruby text component of a ruby annotation. When it is the child of a ruby element or of an rtc element that is itself the child of a ruby element, it doesn't represent anything itself, but its ancestor ruby element uses it as part of determining what it represents."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/rt"
                }
            ]
        },
        {
            "name": "rp",
            "description": {
                "kind": "markdown",
                "value": "The rp element is used to provide fallback text to be shown by user agents that don't support ruby annotations. One widespread convention is to provide parentheses around the ruby text component of a ruby annotation."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/rp"
                }
            ]
        },
        {
            "name": "time",
            "description": {
                "kind": "markdown",
                "value": "The time element represents its contents, along with a machine-readable form of those contents in the datetime attribute. The kind of content is limited to various kinds of dates, times, time-zone offsets, and durations, as described below."
            },
            "attributes": [
                {
                    "name": "datetime",
                    "description": {
                        "kind": "markdown",
                        "value": "This attribute indicates the time and/or date of the element and must be in one of the formats described below."
                    }
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/time"
                }
            ]
        },
        {
            "name": "code",
            "description": {
                "kind": "markdown",
                "value": "The code element represents a fragment of computer code. This could be an XML element name, a file name, a computer program, or any other string that a computer would recognize."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/code"
                }
            ]
        },
        {
            "name": "var",
            "description": {
                "kind": "markdown",
                "value": "The var element represents a variable. This could be an actual variable in a mathematical expression or programming context, an identifier representing a constant, a symbol identifying a physical quantity, a function parameter, or just be a term used as a placeholder in prose."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/var"
                }
            ]
        },
        {
            "name": "samp",
            "description": {
                "kind": "markdown",
                "value": "The samp element represents sample or quoted output from another program or computing system."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/samp"
                }
            ]
        },
        {
            "name": "kbd",
            "description": {
                "kind": "markdown",
                "value": "The kbd element represents user input (typically keyboard input, although it may also be used to represent other input, such as voice commands)."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/kbd"
                }
            ]
        },
        {
            "name": "sub",
            "description": {
                "kind": "markdown",
                "value": "The sub element represents a subscript."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/sub"
                }
            ]
        },
        {
            "name": "sup",
            "description": {
                "kind": "markdown",
                "value": "The sup element represents a superscript."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/sup"
                }
            ]
        },
        {
            "name": "i",
            "description": {
                "kind": "markdown",
                "value": "The i element represents a span of text in an alternate voice or mood, or otherwise offset from the normal prose in a manner indicating a different quality of text, such as a taxonomic designation, a technical term, an idiomatic phrase from another language, transliteration, a thought, or a ship name in Western texts."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/i"
                }
            ]
        },
        {
            "name": "b",
            "description": {
                "kind": "markdown",
                "value": "The b element represents a span of text to which attention is being drawn for utilitarian purposes without conveying any extra importance and with no implication of an alternate voice or mood, such as key words in a document abstract, product names in a review, actionable words in interactive text-driven software, or an article lede."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/b"
                }
            ]
        },
        {
            "name": "u",
            "description": {
                "kind": "markdown",
                "value": "The u element represents a span of text with an unarticulated, though explicitly rendered, non-textual annotation, such as labeling the text as being a proper name in Chinese text (a Chinese proper name mark), or labeling the text as being misspelt."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/u"
                }
            ]
        },
        {
            "name": "mark",
            "description": {
                "kind": "markdown",
                "value": "The mark element represents a run of text in one document marked or highlighted for reference purposes, due to its relevance in another context. When used in a quotation or other block of text referred to from the prose, it indicates a highlight that was not originally present but which has been added to bring the reader's attention to a part of the text that might not have been considered important by the original author when the block was originally written, but which is now under previously unexpected scrutiny. When used in the main prose of a document, it indicates a part of the document that has been highlighted due to its likely relevance to the user's current activity."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/mark"
                }
            ]
        },
        {
            "name": "bdi",
            "description": {
                "kind": "markdown",
                "value": "The bdi element represents a span of text that is to be isolated from its surroundings for the purposes of bidirectional text formatting. [BIDI]"
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/bdi"
                }
            ]
        },
        {
            "name": "bdo",
            "description": {
                "kind": "markdown",
                "value": "The bdo element represents explicit text directionality formatting control for its children. It allows authors to override the Unicode bidirectional algorithm by explicitly specifying a direction override. [BIDI]"
            },
            "attributes": [
                {
                    "name": "dir",
                    "description": "The direction in which text should be rendered in this element's contents. Possible values are:\n\n*   `ltr`: Indicates that the text should go in a left-to-right direction.\n*   `rtl`: Indicates that the text should go in a right-to-left direction."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/bdo"
                }
            ]
        },
        {
            "name": "span",
            "description": {
                "kind": "markdown",
                "value": "The span element doesn't mean anything on its own, but can be useful when used together with the global attributes, e.g. class, lang, or dir. It represents its children."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/span"
                }
            ]
        },
        {
            "name": "br",
            "description": {
                "kind": "markdown",
                "value": "The br element represents a line break."
            },
            "attributes": [
                {
                    "name": "clear",
                    "description": "Indicates where to begin the next line after the break."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/br"
                }
            ]
        },
        {
            "name": "wbr",
            "description": {
                "kind": "markdown",
                "value": "The wbr element represents a line break opportunity."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/wbr"
                }
            ]
        },
        {
            "name": "ins",
            "description": {
                "kind": "markdown",
                "value": "The ins element represents an addition to the document."
            },
            "attributes": [
                {
                    "name": "cite",
                    "description": "This attribute defines the URI of a resource that explains the change, such as a link to meeting minutes or a ticket in a troubleshooting system."
                },
                {
                    "name": "datetime",
                    "description": "This attribute indicates the time and date of the change and must be a valid date with an optional time string. If the value cannot be parsed as a date with an optional time string, the element does not have an associated time stamp. For the format of the string without a time, see [Format of a valid date string](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#Format_of_a_valid_date_string \"Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.\") in [Date and time formats used in HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats \"Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.\"). The format of the string if it includes both date and time is covered in [Format of a valid local date and time string](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#Format_of_a_valid_local_date_and_time_string \"Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.\") in [Date and time formats used in HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats \"Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.\")."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/ins"
                }
            ]
        },
        {
            "name": "del",
            "description": {
                "kind": "markdown",
                "value": "The del element represents a removal from the document."
            },
            "attributes": [
                {
                    "name": "cite",
                    "description": {
                        "kind": "markdown",
                        "value": "A URI for a resource that explains the change (for example, meeting minutes)."
                    }
                },
                {
                    "name": "datetime",
                    "description": {
                        "kind": "markdown",
                        "value": "This attribute indicates the time and date of the change and must be a valid date string with an optional time. If the value cannot be parsed as a date with an optional time string, the element does not have an associated time stamp. For the format of the string without a time, see [Format of a valid date string](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#Format_of_a_valid_date_string \"Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.\") in [Date and time formats used in HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats \"Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.\"). The format of the string if it includes both date and time is covered in [Format of a valid local date and time string](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#Format_of_a_valid_local_date_and_time_string \"Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.\") in [Date and time formats used in HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats \"Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.\")."
                    }
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/del"
                }
            ]
        },
        {
            "name": "picture",
            "description": {
                "kind": "markdown",
                "value": "The picture element is a container which provides multiple sources to its contained img element to allow authors to declaratively control or give hints to the user agent about which image resource to use, based on the screen pixel density, viewport size, image format, and other factors. It represents its children."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/picture"
                }
            ]
        },
        {
            "name": "img",
            "description": {
                "kind": "markdown",
                "value": "An img element represents an image."
            },
            "attributes": [
                {
                    "name": "alt",
                    "description": {
                        "kind": "markdown",
                        "value": "This attribute defines an alternative text description of the image.\n\n**Note:** Browsers do not always display the image referenced by the element. This is the case for non-graphical browsers (including those used by people with visual impairments), if the user chooses not to display images, or if the browser cannot display the image because it is invalid or an [unsupported type](#Supported_image_formats). In these cases, the browser may replace the image with the text defined in this element's `alt` attribute. You should, for these reasons and others, provide a useful value for `alt` whenever possible.\n\n**Note:** Omitting this attribute altogether indicates that the image is a key part of the content, and no textual equivalent is available. Setting this attribute to an empty string (`alt=\"\"`) indicates that this image is _not_ a key part of the content (decorative), and that non-visual browsers may omit it from rendering."
                    }
                },
                {
                    "name": "src",
                    "description": {
                        "kind": "markdown",
                        "value": "The image URL. This attribute is mandatory for the `<img>` element. On browsers supporting `srcset`, `src` is treated like a candidate image with a pixel density descriptor `1x` unless an image with this pixel density descriptor is already defined in `srcset,` or unless `srcset` contains '`w`' descriptors."
                    }
                },
                {
                    "name": "srcset",
                    "description": {
                        "kind": "markdown",
                        "value": "A list of one or more strings separated by commas indicating a set of possible image sources for the user agent to use. Each string is composed of:\n\n1.  a URL to an image,\n2.  optionally, whitespace followed by one of:\n    *   A width descriptor, or a positive integer directly followed by '`w`'. The width descriptor is divided by the source size given in the `sizes` attribute to calculate the effective pixel density.\n    *   A pixel density descriptor, which is a positive floating point number directly followed by '`x`'.\n\nIf no descriptor is specified, the source is assigned the default descriptor: `1x`.\n\nIt is incorrect to mix width descriptors and pixel density descriptors in the same `srcset` attribute. Duplicate descriptors (for instance, two sources in the same `srcset` which are both described with '`2x`') are also invalid.\n\nThe user agent selects any one of the available sources at its discretion. This provides them with significant leeway to tailor their selection based on things like user preferences or bandwidth conditions. See our [Responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) tutorial for an example."
                    }
                },
                {
                    "name": "crossorigin",
                    "valueSet": "xo",
                    "description": {
                        "kind": "markdown",
                        "value": "This enumerated attribute indicates if the fetching of the related image must be done using CORS or not. [CORS-enabled images](https://developer.mozilla.org/en-US/docs/CORS_Enabled_Image) can be reused in the [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas \"Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.\") element without being \"[tainted](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image#What_is_a_tainted_canvas).\" The allowed values are:"
                    }
                },
                {
                    "name": "usemap",
                    "description": {
                        "kind": "markdown",
                        "value": "The partial URL (starting with '#') of an [image map](https://developer.mozilla.org/en-US/docs/HTML/Element/map) associated with the element.\n\n**Note:** You cannot use this attribute if the `<img>` element is a descendant of an [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a \"The HTML <a> element (or anchor element) creates a hyperlink to other web pages, files, locations within the same page, email addresses, or any other URL.\") or [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button \"The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.\") element."
                    }
                },
                {
                    "name": "ismap",
                    "valueSet": "v",
                    "description": {
                        "kind": "markdown",
                        "value": "This Boolean attribute indicates that the image is part of a server-side map. If so, the precise coordinates of a click are sent to the server.\n\n**Note:** This attribute is allowed only if the `<img>` element is a descendant of an [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a \"The HTML <a> element (or anchor element) creates a hyperlink to other web pages, files, locations within the same page, email addresses, or any other URL.\") element with a valid [`href`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href) attribute."
                    }
                },
                {
                    "name": "width",
                    "description": {
                        "kind": "markdown",
                        "value": "The intrinsic width of the image in pixels."
                    }
                },
                {
                    "name": "height",
                    "description": {
                        "kind": "markdown",
                        "value": "The intrinsic height of the image in pixels."
                    }
                },
                {
                    "name": "decoding",
                    "description": "Provides an image decoding hint to the browser. The allowed values are:"
                },
                {
                    "name": "decoding",
                    "description": "`sync`\n\nDecode the image synchronously for atomic presentation with other content.\n\n`async`\n\nDecode the image asynchronously to reduce delay in presenting other content.\n\n`auto`\n\nDefault mode, which indicates no preference for the decoding mode. The browser decides what is best for the user."
                },
                {
                    "name": "importance",
                    "description": "Indicates the relative importance of the resource. Priority hints are delegated using the values:"
                },
                {
                    "name": "importance",
                    "description": "`auto`: Indicates **no preference**. The browser may use its own heuristics to decide the priority of the image.\n\n`high`: Indicates to the browser that the image is of **high** priority.\n\n`low`: Indicates to the browser that the image is of **low** priority."
                },
                {
                    "name": "intrinsicsize",
                    "description": "This attribute tells the browser to ignore the actual intrinsic size of the image and pretend it’s the size specified in the attribute. Specifically, the image would raster at these dimensions and `naturalWidth`/`naturalHeight` on images would return the values specified in this attribute. [Explainer](https://github.com/ojanvafai/intrinsicsize-attribute), [examples](https://googlechrome.github.io/samples/intrinsic-size/index.html)"
                },
                {
                    "name": "referrerpolicy",
                    "description": "A string indicating which referrer to use when fetching the resource:\n\n*   `no-referrer:` The [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer \"The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.\") header will not be sent.\n*   `no-referrer-when-downgrade:` No `Referer` header will be sent when navigating to an origin without TLS (HTTPS). This is a user agent’s default behavior if no policy is otherwise specified.\n*   `origin:` The `Referer` header will include the page of origin's scheme, the host, and the port.\n*   `origin-when-cross-origin:` Navigating to other origins will limit the included referral data to the scheme, the host and the port, while navigating from the same origin will include the referrer's full path.\n*   `unsafe-url:` The `Referer` header will include the origin and the path, but not the fragment, password, or username. This case is unsafe because it can leak origins and paths from TLS-protected resources to insecure origins."
                },
                {
                    "name": "sizes",
                    "description": "A list of one or more strings separated by commas indicating a set of source sizes. Each source size consists of:\n\n1.  a media condition. This must be omitted for the last item.\n2.  a source size value.\n\nSource size values specify the intended display size of the image. User agents use the current source size to select one of the sources supplied by the `srcset` attribute, when those sources are described using width ('`w`') descriptors. The selected source size affects the intrinsic size of the image (the image’s display size if no CSS styling is applied). If the `srcset` attribute is absent, or contains no values with a width (`w`) descriptor, then the `sizes` attribute has no effect."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/img"
                }
            ]
        },
        {
            "name": "iframe",
            "description": {
                "kind": "markdown",
                "value": "The iframe element represents a nested browsing context."
            },
            "attributes": [
                {
                    "name": "src",
                    "description": {
                        "kind": "markdown",
                        "value": "The URL of the page to embed. Use a value of `about:blank` to embed an empty page that conforms to the [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#Inherited_origins). Also note that programatically removing an `<iframe>`'s src attribute (e.g. via [`Element.removeAttribute()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute \"The Element method removeAttribute() removes the attribute with the specified name from the element.\")) causes `about:blank` to be loaded in the frame in Firefox (from version 65), Chromium-based browsers, and Safari/iOS."
                    }
                },
                {
                    "name": "srcdoc",
                    "description": {
                        "kind": "markdown",
                        "value": "Inline HTML to embed, overriding the `src` attribute. If a browser does not support the `srcdoc` attribute, it will fall back to the URL in the `src` attribute."
                    }
                },
                {
                    "name": "name",
                    "description": {
                        "kind": "markdown",
                        "value": "A targetable name for the embedded browsing context. This can be used in the `target` attribute of the [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a \"The HTML <a> element (or anchor element) creates a hyperlink to other web pages, files, locations within the same page, email addresses, or any other URL.\"), [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form \"The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.\"), or [`<base>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base \"The HTML <base> element specifies the base URL to use for all relative URLs contained within a document. There can be only one <base> element in a document.\") elements; the `formtarget` attribute of the [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input \"The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.\") or [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button \"The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.\") elements; or the `windowName` parameter in the [`window.open()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open \"The Window interface's open() method loads the specified resource into the browsing context (window, <iframe> or tab) with the specified name. If the name doesn't exist, then a new window is opened and the specified resource is loaded into its browsing context.\") method."
                    }
                },
                {
                    "name": "sandbox",
                    "valueSet": "sb",
                    "description": {
                        "kind": "markdown",
                        "value": "Applies extra restrictions to the content in the frame. The value of the attribute can either be empty to apply all restrictions, or space-separated tokens to lift particular restrictions:\n\n*   `allow-forms`: Allows the resource to submit forms. If this keyword is not used, form submission is blocked.\n*   `allow-modals`: Lets the resource [open modal windows](https://html.spec.whatwg.org/multipage/origin.html#sandboxed-modals-flag).\n*   `allow-orientation-lock`: Lets the resource [lock the screen orientation](https://developer.mozilla.org/en-US/docs/Web/API/Screen/lockOrientation).\n*   `allow-pointer-lock`: Lets the resource use the [Pointer Lock API](https://developer.mozilla.org/en-US/docs/WebAPI/Pointer_Lock).\n*   `allow-popups`: Allows popups (such as `window.open()`, `target=\"_blank\"`, or `showModalDialog()`). If this keyword is not used, the popup will silently fail to open.\n*   `allow-popups-to-escape-sandbox`: Lets the sandboxed document open new windows without those windows inheriting the sandboxing. For example, this can safely sandbox an advertisement without forcing the same restrictions upon the page the ad links to.\n*   `allow-presentation`: Lets the resource start a [presentation session](https://developer.mozilla.org/en-US/docs/Web/API/PresentationRequest).\n*   `allow-same-origin`: If this token is not used, the resource is treated as being from a special origin that always fails the [same-origin policy](https://developer.mozilla.org/en-US/docs/Glossary/same-origin_policy \"same-origin policy: The same-origin policy is a critical security mechanism that restricts how a document or script loaded from one origin can interact with a resource from another origin.\").\n*   `allow-scripts`: Lets the resource run scripts (but not create popup windows).\n*   `allow-storage-access-by-user-activation` : Lets the resource request access to the parent's storage capabilities with the [Storage Access API](https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API).\n*   `allow-top-navigation`: Lets the resource navigate the top-level browsing context (the one named `_top`).\n*   `allow-top-navigation-by-user-activation`: Lets the resource navigate the top-level browsing context, but only if initiated by a user gesture.\n\n**Notes about sandboxing:**\n\n*   When the embedded document has the same origin as the embedding page, it is **strongly discouraged** to use both `allow-scripts` and `allow-same-origin`, as that lets the embedded document remove the `sandbox` attribute — making it no more secure than not using the `sandbox` attribute at all.\n*   Sandboxing is useless if the attacker can display content outside a sandboxed `iframe` — such as if the viewer opens the frame in a new tab. Such content should be also served from a _separate origin_ to limit potential damage.\n*   The `sandbox` attribute is unsupported in Internet Explorer 9 and earlier."
                    }
                },
                {
                    "name": "seamless",
                    "valueSet": "v"
                },
                {
                    "name": "allowfullscreen",
                    "valueSet": "v",
                    "description": {
                        "kind": "markdown",
                        "value": "Set to `true` if the `<iframe>` can activate fullscreen mode by calling the [`requestFullscreen()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen \"The Element.requestFullscreen() method issues an asynchronous request to make the element be displayed in full-screen mode.\") method."
                    }
                },
                {
                    "name": "width",
                    "description": {
                        "kind": "markdown",
                        "value": "The width of the frame in CSS pixels. Default is `300`."
                    }
                },
                {
                    "name": "height",
                    "description": {
                        "kind": "markdown",
                        "value": "The height of the frame in CSS pixels. Default is `150`."
                    }
                },
                {
                    "name": "allow",
                    "description": "Specifies a [feature policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Feature_Policy) for the `<iframe>`."
                },
                {
                    "name": "allowpaymentrequest",
                    "description": "Set to `true` if a cross-origin `<iframe>` should be allowed to invoke the [Payment Request API](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API)."
                },
                {
                    "name": "allowpaymentrequest",
                    "description": "This attribute is considered a legacy attribute and redefined as `allow=\"payment\"`."
                },
                {
                    "name": "csp",
                    "description": "A [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) enforced for the embedded resource. See [`HTMLIFrameElement.csp`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/csp \"The csp property of the HTMLIFrameElement interface specifies the Content Security Policy that an embedded document must agree to enforce upon itself.\") for details."
                },
                {
                    "name": "importance",
                    "description": "The download priority of the resource in the `<iframe>`'s `src` attribute. Allowed values:\n\n`auto` (default)\n\nNo preference. The browser uses its own heuristics to decide the priority of the resource.\n\n`high`\n\nThe resource should be downloaded before other lower-priority page resources.\n\n`low`\n\nThe resource should be downloaded after other higher-priority page resources."
                },
                {
                    "name": "referrerpolicy",
                    "description": "Indicates which [referrer](https://developer.mozilla.org/en-US/docs/Web/API/Document/referrer) to send when fetching the frame's resource:\n\n*   `no-referrer`: The [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer \"The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.\") header will not be sent.\n*   `no-referrer-when-downgrade` (default): The [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer \"The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.\") header will not be sent to [origin](https://developer.mozilla.org/en-US/docs/Glossary/origin \"origin: Web content's origin is defined by the scheme (protocol), host (domain), and port of the URL used to access it. Two objects have the same origin only when the scheme, host, and port all match.\")s without [TLS](https://developer.mozilla.org/en-US/docs/Glossary/TLS \"TLS: Transport Layer Security (TLS), previously known as Secure Sockets Layer (SSL), is a protocol used by applications to communicate securely across a network, preventing tampering with and eavesdropping on email, web browsing, messaging, and other protocols.\") ([HTTPS](https://developer.mozilla.org/en-US/docs/Glossary/HTTPS \"HTTPS: HTTPS (HTTP Secure) is an encrypted version of the HTTP protocol. It usually uses SSL or TLS to encrypt all communication between a client and a server. This secure connection allows clients to safely exchange sensitive data with a server, for example for banking activities or online shopping.\")).\n*   `origin`: The sent referrer will be limited to the origin of the referring page: its [scheme](https://developer.mozilla.org/en-US/docs/Archive/Mozilla/URIScheme), [host](https://developer.mozilla.org/en-US/docs/Glossary/host \"host: A host is a device connected to the Internet (or a local network). Some hosts called servers offer additional services like serving webpages or storing files and emails.\"), and [port](https://developer.mozilla.org/en-US/docs/Glossary/port \"port: For a computer connected to a network with an IP address, a port is a communication endpoint. Ports are designated by numbers, and below 1024 each port is associated by default with a specific protocol.\").\n*   `origin-when-cross-origin`: The referrer sent to other origins will be limited to the scheme, the host, and the port. Navigations on the same origin will still include the path.\n*   `same-origin`: A referrer will be sent for [same origin](https://developer.mozilla.org/en-US/docs/Glossary/Same-origin_policy \"same origin: The same-origin policy is a critical security mechanism that restricts how a document or script loaded from one origin can interact with a resource from another origin.\"), but cross-origin requests will contain no referrer information.\n*   `strict-origin`: Only send the origin of the document as the referrer when the protocol security level stays the same (HTTPS→HTTPS), but don't send it to a less secure destination (HTTPS→HTTP).\n*   `strict-origin-when-cross-origin`: Send a full URL when performing a same-origin request, only send the origin when the protocol security level stays the same (HTTPS→HTTPS), and send no header to a less secure destination (HTTPS→HTTP).\n*   `unsafe-url`: The referrer will include the origin _and_ the path (but not the [fragment](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/hash), [password](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/password), or [username](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/username)). **This value is unsafe**, because it leaks origins and paths from TLS-protected resources to insecure origins."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/iframe"
                }
            ]
        },
        {
            "name": "embed",
            "description": {
                "kind": "markdown",
                "value": "The embed element provides an integration point for an external (typically non-HTML) application or interactive content."
            },
            "attributes": [
                {
                    "name": "src",
                    "description": {
                        "kind": "markdown",
                        "value": "The URL of the resource being embedded."
                    }
                },
                {
                    "name": "type",
                    "description": {
                        "kind": "markdown",
                        "value": "The MIME type to use to select the plug-in to instantiate."
                    }
                },
                {
                    "name": "width",
                    "description": {
                        "kind": "markdown",
                        "value": "The displayed width of the resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). This must be an absolute value; percentages are _not_ allowed."
                    }
                },
                {
                    "name": "height",
                    "description": {
                        "kind": "markdown",
                        "value": "The displayed height of the resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). This must be an absolute value; percentages are _not_ allowed."
                    }
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/embed"
                }
            ]
        },
        {
            "name": "object",
            "description": {
                "kind": "markdown",
                "value": "The object element can represent an external resource, which, depending on the type of the resource, will either be treated as an image, as a nested browsing context, or as an external resource to be processed by a plugin."
            },
            "attributes": [
                {
                    "name": "data",
                    "description": {
                        "kind": "markdown",
                        "value": "The address of the resource as a valid URL. At least one of **data** and **type** must be defined."
                    }
                },
                {
                    "name": "type",
                    "description": {
                        "kind": "markdown",
                        "value": "The [content type](https://developer.mozilla.org/en-US/docs/Glossary/Content_type) of the resource specified by **data**. At least one of **data** and **type** must be defined."
                    }
                },
                {
                    "name": "typemustmatch",
                    "valueSet": "v",
                    "description": {
                        "kind": "markdown",
                        "value": "This Boolean attribute indicates if the **type** attribute and the actual [content type](https://developer.mozilla.org/en-US/docs/Glossary/Content_type) of the resource must match to be used."
                    }
                },
                {
                    "name": "name",
                    "description": {
                        "kind": "markdown",
                        "value": "The name of valid browsing context (HTML5), or the name of the control (HTML 4)."
                    }
                },
                {
                    "name": "usemap",
                    "description": {
                        "kind": "markdown",
                        "value": "A hash-name reference to a [`<map>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map \"The HTML <map> element is used with <area> elements to define an image map (a clickable link area).\") element; that is a '#' followed by the value of a [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map#attr-name) of a map element."
                    }
                },
                {
                    "name": "form",
                    "description": {
                        "kind": "markdown",
                        "value": "The form element, if any, that the object element is associated with (its _form owner_). The value of the attribute must be an ID of a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form \"The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.\") element in the same document."
                    }
                },
                {
                    "name": "width",
                    "description": {
                        "kind": "markdown",
                        "value": "The width of the display resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). -- (Absolute values only. [NO percentages](https://html.spec.whatwg.org/multipage/embedded-content.html#dimension-attributes))"
                    }
                },
                {
                    "name": "height",
                    "description": {
                        "kind": "markdown",
                        "value": "The height of the displayed resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). -- (Absolute values only. [NO percentages](https://html.spec.whatwg.org/multipage/embedded-content.html#dimension-attributes))"
                    }
                },
                {
                    "name": "archive",
                    "description": "A space-separated list of URIs for archives of resources for the object."
                },
                {
                    "name": "border",
                    "description": "The width of a border around the control, in pixels."
                },
                {
                    "name": "classid",
                    "description": "The URI of the object's implementation. It can be used together with, or in place of, the **data** attribute."
                },
                {
                    "name": "codebase",
                    "description": "The base path used to resolve relative URIs specified by **classid**, **data**, or **archive**. If not specified, the default is the base URI of the current document."
                },
                {
                    "name": "codetype",
                    "description": "The content type of the data specified by **classid**."
                },
                {
                    "name": "declare",
                    "description": "The presence of this Boolean attribute makes this element a declaration only. The object must be instantiated by a subsequent `<object>` element. In HTML5, repeat the <object> element completely each that that the resource is reused."
                },
                {
                    "name": "standby",
                    "description": "A message that the browser can show while loading the object's implementation and data."
                },
                {
                    "name": "tabindex",
                    "description": "The position of the element in the tabbing navigation order for the current document."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/object"
                }
            ]
        },
        {
            "name": "param",
            "description": {
                "kind": "markdown",
                "value": "The param element defines parameters for plugins invoked by object elements. It does not represent anything on its own."
            },
            "attributes": [
                {
                    "name": "name",
                    "description": {
                        "kind": "markdown",
                        "value": "Name of the parameter."
                    }
                },
                {
                    "name": "value",
                    "description": {
                        "kind": "markdown",
                        "value": "Specifies the value of the parameter."
                    }
                },
                {
                    "name": "type",
                    "description": "Only used if the `valuetype` is set to \"ref\". Specifies the MIME type of values found at the URI specified by value."
                },
                {
                    "name": "valuetype",
                    "description": "Specifies the type of the `value` attribute. Possible values are:\n\n*   data: Default value. The value is passed to the object's implementation as a string.\n*   ref: The value is a URI to a resource where run-time values are stored.\n*   object: An ID of another [`<object>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object \"The HTML <object> element represents an external resource, which can be treated as an image, a nested browsing context, or a resource to be handled by a plugin.\") in the same document."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/param"
                }
            ]
        },
        {
            "name": "video",
            "description": {
                "kind": "markdown",
                "value": "A video element is used for playing videos or movies, and audio files with captions."
            },
            "attributes": [
                {
                    "name": "src"
                },
                {
                    "name": "crossorigin",
                    "valueSet": "xo"
                },
                {
                    "name": "poster"
                },
                {
                    "name": "preload",
                    "valueSet": "pl"
                },
                {
                    "name": "autoplay",
                    "valueSet": "v",
                    "description": {
                        "kind": "markdown",
                        "value": "A Boolean attribute; if specified, the video automatically begins to play back as soon as it can do so without stopping to finish loading the data."
                    }
                },
                {
                    "name": "mediagroup"
                },
                {
                    "name": "loop",
                    "valueSet": "v"
                },
                {
                    "name": "muted",
                    "valueSet": "v"
                },
                {
                    "name": "controls",
                    "valueSet": "v"
                },
                {
                    "name": "width"
                },
                {
                    "name": "height"
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/video"
                }
            ]
        },
        {
            "name": "audio",
            "description": {
                "kind": "markdown",
                "value": "An audio element represents a sound or audio stream."
            },
            "attributes": [
                {
                    "name": "src",
                    "description": {
                        "kind": "markdown",
                        "value": "The URL of the audio to embed. This is subject to [HTTP access controls](https://developer.mozilla.org/en-US/docs/HTTP_access_control). This is optional; you may instead use the [`<source>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source \"The HTML <source> element specifies multiple media resources for the <picture>, the <audio> element, or the <video> element.\") element within the audio block to specify the audio to embed."
                    }
                },
                {
                    "name": "crossorigin",
                    "valueSet": "xo",
                    "description": {
                        "kind": "markdown",
                        "value": "This enumerated attribute indicates whether to use CORS to fetch the related image. [CORS-enabled resources](https://developer.mozilla.org/en-US/docs/CORS_Enabled_Image) can be reused in the [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas \"Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.\") element without being _tainted_. The allowed values are:\n\nanonymous\n\nSends a cross-origin request without a credential. In other words, it sends the `Origin:` HTTP header without a cookie, X.509 certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (by not setting the `Access-Control-Allow-Origin:` HTTP header), the image will be _tainted_, and its usage restricted.\n\nuse-credentials\n\nSends a cross-origin request with a credential. In other words, it sends the `Origin:` HTTP header with a cookie, a certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (through `Access-Control-Allow-Credentials:` HTTP header), the image will be _tainted_ and its usage restricted.\n\nWhen not present, the resource is fetched without a CORS request (i.e. without sending the `Origin:` HTTP header), preventing its non-tainted used in [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas \"Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.\") elements. If invalid, it is handled as if the enumerated keyword **anonymous** was used. See [CORS settings attributes](https://developer.mozilla.org/en-US/docs/HTML/CORS_settings_attributes) for additional information."
                    }
                },
                {
                    "name": "preload",
                    "valueSet": "pl",
                    "description": {
                        "kind": "markdown",
                        "value": "This enumerated attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience. It may have one of the following values:\n\n*   `none`: Indicates that the audio should not be preloaded.\n*   `metadata`: Indicates that only audio metadata (e.g. length) is fetched.\n*   `auto`: Indicates that the whole audio file can be downloaded, even if the user is not expected to use it.\n*   _empty string_: A synonym of the `auto` value.\n\nIf not set, `preload`'s default value is browser-defined (i.e. each browser may have its own default value). The spec advises it to be set to `metadata`.\n\n**Usage notes:**\n\n*   The `autoplay` attribute has precedence over `preload`. If `autoplay` is specified, the browser would obviously need to start downloading the audio for playback.\n*   The browser is not forced by the specification to follow the value of this attribute; it is a mere hint."
                    }
                },
                {
                    "name": "autoplay",
                    "valueSet": "v",
                    "description": {
                        "kind": "markdown",
                        "value": "A Boolean attribute: if specified, the audio will automatically begin playback as soon as it can do so, without waiting for the entire audio file to finish downloading.\n\n**Note**: Sites that automatically play audio (or videos with an audio track) can be an unpleasant experience for users, so should be avoided when possible. If you must offer autoplay functionality, you should make it opt-in (requiring a user to specifically enable it). However, this can be useful when creating media elements whose source will be set at a later time, under user control."
                    }
                },
                {
                    "name": "mediagroup"
                },
                {
                    "name": "loop",
                    "valueSet": "v",
                    "description": {
                        "kind": "markdown",
                        "value": "A Boolean attribute: if specified, the audio player will automatically seek back to the start upon reaching the end of the audio."
                    }
                },
                {
                    "name": "muted",
                    "valueSet": "v",
                    "description": {
                        "kind": "markdown",
                        "value": "A Boolean attribute that indicates whether the audio will be initially silenced. Its default value is `false`."
                    }
                },
                {
                    "name": "controls",
                    "valueSet": "v",
                    "description": {
                        "kind": "markdown",
                        "value": "If this attribute is present, the browser will offer controls to allow the user to control audio playback, including volume, seeking, and pause/resume playback."
                    }
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/audio"
                }
            ]
        },
        {
            "name": "source",
            "description": {
                "kind": "markdown",
                "value": "The source element allows authors to specify multiple alternative media resources for media elements. It does not represent anything on its own."
            },
            "attributes": [
                {
                    "name": "src",
                    "description": {
                        "kind": "markdown",
                        "value": "Required for [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio \"The HTML <audio> element is used to embed sound content in documents. It may contain one or more audio sources, represented using the src attribute or the <source> element: the browser will choose the most suitable one. It can also be the destination for streamed media, using a MediaStream.\") and [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video \"The HTML Video element (<video>) embeds a media player which supports video playback into the document.\"), address of the media resource. The value of this attribute is ignored when the `<source>` element is placed inside a [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture \"The HTML <picture> element contains zero or more <source> elements and one <img> element to provide versions of an image for different display/device scenarios.\") element."
                    }
                },
                {
                    "name": "type",
                    "description": {
                        "kind": "markdown",
                        "value": "The MIME-type of the resource, optionally with a `codecs` parameter. See [RFC 4281](https://tools.ietf.org/html/rfc4281) for information about how to specify codecs."
                    }
                },
                {
                    "name": "sizes",
                    "description": "Is a list of source sizes that describes the final rendered width of the image represented by the source. Each source size consists of a comma-separated list of media condition-length pairs. This information is used by the browser to determine, before laying the page out, which image defined in [`srcset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#attr-srcset) to use.  \nThe `sizes` attribute has an effect only when the [`<source>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source \"The HTML <source> element specifies multiple media resources for the <picture>, the <audio> element, or the <video> element.\") element is the direct child of a [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture \"The HTML <picture> element contains zero or more <source> elements and one <img> element to provide versions of an image for different display/device scenarios.\") element."
                },
                {
                    "name": "srcset",
                    "description": "A list of one or more strings separated by commas indicating a set of possible images represented by the source for the browser to use. Each string is composed of:\n\n1.  one URL to an image,\n2.  a width descriptor, that is a positive integer directly followed by `'w'`. The default value, if missing, is the infinity.\n3.  a pixel density descriptor, that is a positive floating number directly followed by `'x'`. The default value, if missing, is `1x`.\n\nEach string in the list must have at least a width descriptor or a pixel density descriptor to be valid. Among the list, there must be only one string containing the same tuple of width descriptor and pixel density descriptor.  \nThe browser chooses the most adequate image to display at a given point of time.  \nThe `srcset` attribute has an effect only when the [`<source>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source \"The HTML <source> element specifies multiple media resources for the <picture>, the <audio> element, or the <video> element.\") element is the direct child of a [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture \"The HTML <picture> element contains zero or more <source> elements and one <img> element to provide versions of an image for different display/device scenarios.\") element."
                },
                {
                    "name": "media",
                    "description": "[Media query](https://developer.mozilla.org/en-US/docs/CSS/Media_queries) of the resource's intended media; this should be used only in a [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture \"The HTML <picture> element contains zero or more <source> elements and one <img> element to provide versions of an image for different display/device scenarios.\") element."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/source"
                }
            ]
        },
        {
            "name": "track",
            "description": {
                "kind": "markdown",
                "value": "The track element allows authors to specify explicit external timed text tracks for media elements. It does not represent anything on its own."
            },
            "attributes": [
                {
                    "name": "default",
                    "valueSet": "v",
                    "description": {
                        "kind": "markdown",
                        "value": "This attribute indicates that the track should be enabled unless the user's preferences indicate that another track is more appropriate. This may only be used on one `track` element per media element."
                    }
                },
                {
                    "name": "kind",
                    "valueSet": "tk",
                    "description": {
                        "kind": "markdown",
                        "value": "How the text track is meant to be used. If omitted the default kind is `subtitles`. If the attribute is not present, it will use the `subtitles`. If the attribute contains an invalid value, it will use `metadata`. (Versions of Chrome earlier than 52 treated an invalid value as `subtitles`.) The following keywords are allowed:\n\n*   `subtitles`\n    *   Subtitles provide translation of content that cannot be understood by the viewer. For example dialogue or text that is not English in an English language film.\n    *   Subtitles may contain additional content, usually extra background information. For example the text at the beginning of the Star Wars films, or the date, time, and location of a scene.\n*   `captions`\n    *   Closed captions provide a transcription and possibly a translation of audio.\n    *   It may include important non-verbal information such as music cues or sound effects. It may indicate the cue's source (e.g. music, text, character).\n    *   Suitable for users who are deaf or when the sound is muted.\n*   `descriptions`\n    *   Textual description of the video content.\n    *   Suitable for users who are blind or where the video cannot be seen.\n*   `chapters`\n    *   Chapter titles are intended to be used when the user is navigating the media resource.\n*   `metadata`\n    *   Tracks used by scripts. Not visible to the user."
                    }
                },
                {
                    "name": "label",
                    "description": {
                        "kind": "markdown",
                        "value": "A user-readable title of the text track which is used by the browser when listing available text tracks."
                    }
                },
                {
                    "name": "src",
                    "description": {
                        "kind": "markdown",
                        "value": "Address of the track (`.vtt` file). Must be a valid URL. This attribute must be specified and its URL value must have the same origin as the document — unless the [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio \"The HTML <audio> element is used to embed sound content in documents. It may contain one or more audio sources, represented using the src attribute or the <source> element: the browser will choose the most suitable one. It can also be the destination for streamed media, using a MediaStream.\") or [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video \"The HTML Video element (<video>) embeds a media player which supports video playback into the document.\") parent element of the `track` element has a [`crossorigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) attribute."
                    }
                },
                {
                    "name": "srclang",
                    "description": {
                        "kind": "markdown",
                        "value": "Language of the track text data. It must be a valid [BCP 47](https://r12a.github.io/app-subtags/) language tag. If the `kind` attribute is set to `subtitles,` then `srclang` must be defined."
                    }
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/track"
                }
            ]
        },
        {
            "name": "map",
            "description": {
                "kind": "markdown",
                "value": "The map element, in conjunction with an img element and any area element descendants, defines an image map. The element represents its children."
            },
            "attributes": [
                {
                    "name": "name",
                    "description": {
                        "kind": "markdown",
                        "value": "The name attribute gives the map a name so that it can be referenced. The attribute must be present and must have a non-empty value with no space characters. The value of the name attribute must not be a compatibility-caseless match for the value of the name attribute of another map element in the same document. If the id attribute is also specified, both attributes must have the same value."
                    }
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/map"
                }
            ]
        },
        {
            "name": "area",
            "description": {
                "kind": "markdown",
                "value": "The area element represents either a hyperlink with some text and a corresponding area on an image map, or a dead area on an image map."
            },
            "attributes": [
                {
                    "name": "alt"
                },
                {
                    "name": "coords"
                },
                {
                    "name": "shape",
                    "valueSet": "sh"
                },
                {
                    "name": "href"
                },
                {
                    "name": "target"
                },
                {
                    "name": "download"
                },
                {
                    "name": "ping"
                },
                {
                    "name": "rel"
                },
                {
                    "name": "hreflang"
                },
                {
                    "name": "type"
                },
                {
                    "name": "accesskey",
                    "description": "Specifies a keyboard navigation accelerator for the element. Pressing ALT or a similar key in association with the specified character selects the form control correlated with that key sequence. Page designers are forewarned to avoid key sequences already bound to browsers. This attribute is global since HTML5."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/area"
                }
            ]
        },
        {
            "name": "table",
            "description": {
                "kind": "markdown",
                "value": "The table element represents data with more than one dimension, in the form of a table."
            },
            "attributes": [
                {
                    "name": "border"
                },
                {
                    "name": "align",
                    "description": "This enumerated attribute indicates how the table must be aligned inside the containing document. It may have the following values:\n\n*   left: the table is displayed on the left side of the document;\n*   center: the table is displayed in the center of the document;\n*   right: the table is displayed on the right side of the document.\n\n**Usage Note**\n\n*   **Do not use this attribute**, as it has been deprecated. The [`<table>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table \"The HTML <table> element represents tabular data — that is, information presented in a two-dimensional table comprised of rows and columns of cells containing data.\") element should be styled using [CSS](https://developer.mozilla.org/en-US/docs/CSS). Set [`margin-left`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left \"The margin-left CSS property sets the margin area on the left side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.\") and [`margin-right`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right \"The margin-right CSS property sets the margin area on the right side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.\") to `auto` or [`margin`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin \"The margin CSS property sets the margin area on all four sides of an element. It is a shorthand for margin-top, margin-right, margin-bottom, and margin-left.\") to `0 auto` to achieve an effect that is similar to the align attribute.\n*   Prior to Firefox 4, Firefox also supported the `middle`, `absmiddle`, and `abscenter` values as synonyms of `center`, in quirks mode only."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/table"
                }
            ]
        },
        {
            "name": "caption",
            "description": {
                "kind": "markdown",
                "value": "The caption element represents the title of the table that is its parent, if it has a parent and that is a table element."
            },
            "attributes": [
                {
                    "name": "align",
                    "description": "This enumerated attribute indicates how the caption must be aligned with respect to the table. It may have one of the following values:\n\n`left`\n\nThe caption is displayed to the left of the table.\n\n`top`\n\nThe caption is displayed above the table.\n\n`right`\n\nThe caption is displayed to the right of the table.\n\n`bottom`\n\nThe caption is displayed below the table.\n\n**Usage note:** Do not use this attribute, as it has been deprecated. The [`<caption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption \"The HTML Table Caption element (<caption>) specifies the caption (or title) of a table, and if used is always the first child of a <table>.\") element should be styled using the [CSS](https://developer.mozilla.org/en-US/docs/CSS) properties [`caption-side`](https://developer.mozilla.org/en-US/docs/Web/CSS/caption-side \"The caption-side CSS property puts the content of a table's <caption> on the specified side. The values are relative to the writing-mode of the table.\") and [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align \"The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.\")."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/caption"
                }
            ]
        },
        {
            "name": "colgroup",
            "description": {
                "kind": "markdown",
                "value": "The colgroup element represents a group of one or more columns in the table that is its parent, if it has a parent and that is a table element."
            },
            "attributes": [
                {
                    "name": "span"
                },
                {
                    "name": "align",
                    "description": "This enumerated attribute specifies how horizontal alignment of each column cell content will be handled. Possible values are:\n\n*   `left`, aligning the content to the left of the cell\n*   `center`, centering the content in the cell\n*   `right`, aligning the content to the right of the cell\n*   `justify`, inserting spaces into the textual content so that the content is justified in the cell\n*   `char`, aligning the textual content on a special character with a minimal offset, defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-charoff) attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 \"character alignment not implemented (align=char, charoff=, text-align:<string>)\")).\n\nIf this attribute is not set, the `left` value is assumed. The descendant [`<col>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col \"The HTML <col> element defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a <colgroup> element.\") elements may override this value using their own [`align`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-align) attribute.\n\n**Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values:\n    *   Do not try to set the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align \"The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.\") property on a selector giving a [`<colgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup \"The HTML <colgroup> element defines a group of columns within a table.\") element. Because [`<td>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td \"The HTML <td> element defines a cell of a table that contains data. It participates in the table model.\") elements are not descendant of the [`<colgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup \"The HTML <colgroup> element defines a group of columns within a table.\") element, they won't inherit it.\n    *   If the table doesn't use a [`colspan`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-colspan) attribute, use one `td:nth-child(an+b)` CSS selector per column, where a is the total number of the columns in the table and b is the ordinal position of this column in the table. Only after this selector the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align \"The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.\") property can be used.\n    *   If the table does use a [`colspan`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-colspan) attribute, the effect can be achieved by combining adequate CSS attribute selectors like `[colspan=n]`, though this is not trivial.\n*   To achieve the same effect as the `char` value, in CSS3, you can use the value of the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup#attr-char) as the value of the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align \"The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.\") property Unimplemented."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/colgroup"
                }
            ]
        },
        {
            "name": "col",
            "description": {
                "kind": "markdown",
                "value": "If a col element has a parent and that is a colgroup element that itself has a parent that is a table element, then the col element represents one or more columns in the column group represented by that colgroup."
            },
            "attributes": [
                {
                    "name": "span"
                },
                {
                    "name": "align",
                    "description": "This enumerated attribute specifies how horizontal alignment of each column cell content will be handled. Possible values are:\n\n*   `left`, aligning the content to the left of the cell\n*   `center`, centering the content in the cell\n*   `right`, aligning the content to the right of the cell\n*   `justify`, inserting spaces into the textual content so that the content is justified in the cell\n*   `char`, aligning the textual content on a special character with a minimal offset, defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-charoff) attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 \"character alignment not implemented (align=char, charoff=, text-align:<string>)\")).\n\nIf this attribute is not set, its value is inherited from the [`align`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup#attr-align) of the [`<colgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup \"The HTML <colgroup> element defines a group of columns within a table.\") element this `<col>` element belongs too. If there are none, the `left` value is assumed.\n\n**Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values:\n    *   Do not try to set the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align \"The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.\") property on a selector giving a [`<col>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col \"The HTML <col> element defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a <colgroup> element.\") element. Because [`<td>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td \"The HTML <td> element defines a cell of a table that contains data. It participates in the table model.\") elements are not descendant of the [`<col>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col \"The HTML <col> element defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a <colgroup> element.\") element, they won't inherit it.\n    *   If the table doesn't use a [`colspan`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-colspan) attribute, use the `td:nth-child(an+b)` CSS selector. Set `a` to zero and `b` to the position of the column in the table, e.g. `td:nth-child(2) { text-align: right; }` to right-align the second column.\n    *   If the table does use a [`colspan`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-colspan) attribute, the effect can be achieved by combining adequate CSS attribute selectors like `[colspan=n]`, though this is not trivial.\n*   To achieve the same effect as the `char` value, in CSS3, you can use the value of the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-char) as the value of the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align \"The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.\") property Unimplemented."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/col"
                }
            ]
        },
        {
            "name": "tbody",
            "description": {
                "kind": "markdown",
                "value": "The tbody element represents a block of rows that consist of a body of data for the parent table element, if the tbody element has a parent and it is a table."
            },
            "attributes": [
                {
                    "name": "align",
                    "description": "This enumerated attribute specifies how horizontal alignment of each cell content will be handled. Possible values are:\n\n*   `left`, aligning the content to the left of the cell\n*   `center`, centering the content in the cell\n*   `right`, aligning the content to the right of the cell\n*   `justify`, inserting spaces into the textual content so that the content is justified in the cell\n*   `char`, aligning the textual content on a special character with a minimal offset, defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody#attr-charoff) attributes.\n\nIf this attribute is not set, the `left` value is assumed.\n\n**Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values, use the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align \"The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.\") property on it.\n*   To achieve the same effect as the `char` value, in CSS3, you can use the value of the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody#attr-char) as the value of the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align \"The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.\") property Unimplemented."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/tbody"
                }
            ]
        },
        {
            "name": "thead",
            "description": {
                "kind": "markdown",
                "value": "The thead element represents the block of rows that consist of the column labels (headers) for the parent table element, if the thead element has a parent and it is a table."
            },
            "attributes": [
                {
                    "name": "align",
                    "description": "This enumerated attribute specifies how horizontal alignment of each cell content will be handled. Possible values are:\n\n*   `left`, aligning the content to the left of the cell\n*   `center`, centering the content in the cell\n*   `right`, aligning the content to the right of the cell\n*   `justify`, inserting spaces into the textual content so that the content is justified in the cell\n*   `char`, aligning the textual content on a special character with a minimal offset, defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead#attr-charoff) attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 \"character alignment not implemented (align=char, charoff=, text-align:<string>)\")).\n\nIf this attribute is not set, the `left` value is assumed.\n\n**Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values, use the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align \"The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.\") property on it.\n*   To achieve the same effect as the `char` value, in CSS3, you can use the value of the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead#attr-char) as the value of the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align \"The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.\") property Unimplemented."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/thead"
                }
            ]
        },
        {
            "name": "tfoot",
            "description": {
                "kind": "markdown",
                "value": "The tfoot element represents the block of rows that consist of the column summaries (footers) for the parent table element, if the tfoot element has a parent and it is a table."
            },
            "attributes": [
                {
                    "name": "align",
                    "description": "This enumerated attribute specifies how horizontal alignment of each cell content will be handled. Possible values are:\n\n*   `left`, aligning the content to the left of the cell\n*   `center`, centering the content in the cell\n*   `right`, aligning the content to the right of the cell\n*   `justify`, inserting spaces into the textual content so that the content is justified in the cell\n*   `char`, aligning the textual content on a special character with a minimal offset, defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody#attr-charoff) attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 \"character alignment not implemented (align=char, charoff=, text-align:<string>)\")).\n\nIf this attribute is not set, the `left` value is assumed.\n\n**Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values, use the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align \"The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.\") property on it.\n*   To achieve the same effect as the `char` value, in CSS3, you can use the value of the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tfoot#attr-char) as the value of the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align \"The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.\") property Unimplemented."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/tfoot"
                }
            ]
        },
        {
            "name": "tr",
            "description": {
                "kind": "markdown",
                "value": "The tr element represents a row of cells in a table."
            },
            "attributes": [
                {
                    "name": "align",
                    "description": "A [`DOMString`](https://developer.mozilla.org/en-US/docs/Web/API/DOMString \"DOMString is a UTF-16 String. As JavaScript already uses such strings, DOMString is mapped directly to a String.\") which specifies how the cell's context should be aligned horizontally within the cells in the row; this is shorthand for using `align` on every cell in the row individually. Possible values are:\n\n`left`\n\nAlign the content of each cell at its left edge.\n\n`center`\n\nCenter the contents of each cell between their left and right edges.\n\n`right`\n\nAlign the content of each cell at its right edge.\n\n`justify`\n\nWiden whitespaces within the text of each cell so that the text fills the full width of each cell (full justification).\n\n`char`\n\nAlign each cell in the row on a specific character (such that each row in the column that is configured this way will horizontally align its cells on that character). This uses the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr#attr-charoff) to establish the alignment character (typically \".\" or \",\" when aligning numerical data) and the number of characters that should follow the alignment character. This alignment type was never widely supported.\n\nIf no value is expressly set for `align`, the parent node's value is inherited.\n\nInstead of using the obsolete `align` attribute, you should instead use the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align \"The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.\") property to establish `left`, `center`, `right`, or `justify` alignment for the row's cells. To apply character-based alignment, set the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align \"The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.\") property to the alignment character (such as `\".\"` or `\",\"`)."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/tr"
                }
            ]
        },
        {
            "name": "td",
            "description": {
                "kind": "markdown",
                "value": "The td element represents a data cell in a table."
            },
            "attributes": [
                {
                    "name": "colspan"
                },
                {
                    "name": "rowspan"
                },
                {
                    "name": "headers"
                },
                {
                    "name": "abbr",
                    "description": "This attribute contains a short abbreviated description of the cell's content. Some user-agents, such as speech readers, may present this description before the content itself.\n\n**Note:** Do not use this attribute as it is obsolete in the latest standard. Alternatively, you can put the abbreviated description inside the cell and place the long content in the **title** attribute."
                },
                {
                    "name": "align",
                    "description": "This enumerated attribute specifies how the cell content's horizontal alignment will be handled. Possible values are:\n\n*   `left`: The content is aligned to the left of the cell.\n*   `center`: The content is centered in the cell.\n*   `right`: The content is aligned to the right of the cell.\n*   `justify` (with text only): The content is stretched out inside the cell so that it covers its entire width.\n*   `char` (with text only): The content is aligned to a character inside the `<th>` element with minimal offset. This character is defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-charoff) attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 \"character alignment not implemented (align=char, charoff=, text-align:<string>)\")).\n\nThe default value when this attribute is not specified is `left`.\n\n**Note:** Do not use this attribute as it is obsolete in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values, apply the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align \"The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.\") property to the element.\n*   To achieve the same effect as the `char` value, give the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align \"The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.\") property the same value you would use for the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-char). Unimplemented in CSS3."
                },
                {
                    "name": "axis",
                    "description": "This attribute contains a list of space-separated strings. Each string is the `id` of a group of cells that this header applies to.\n\n**Note:** Do not use this attribute as it is obsolete in the latest standard."
                },
                {
                    "name": "bgcolor",
                    "description": "This attribute defines the background color of each cell in a column. It consists of a 6-digit hexadecimal code as defined in [sRGB](https://www.w3.org/Graphics/Color/sRGB) and is prefixed by '#'. This attribute may be used with one of sixteen predefined color strings:\n\n \n\n`black` = \"#000000\"\n\n \n\n`green` = \"#008000\"\n\n \n\n`silver` = \"#C0C0C0\"\n\n \n\n`lime` = \"#00FF00\"\n\n \n\n`gray` = \"#808080\"\n\n \n\n`olive` = \"#808000\"\n\n \n\n`white` = \"#FFFFFF\"\n\n \n\n`yellow` = \"#FFFF00\"\n\n \n\n`maroon` = \"#800000\"\n\n \n\n`navy` = \"#000080\"\n\n \n\n`red` = \"#FF0000\"\n\n \n\n`blue` = \"#0000FF\"\n\n \n\n`purple` = \"#800080\"\n\n \n\n`teal` = \"#008080\"\n\n \n\n`fuchsia` = \"#FF00FF\"\n\n \n\n`aqua` = \"#00FFFF\"\n\n**Note:** Do not use this attribute, as it is non-standard and only implemented in some versions of Microsoft Internet Explorer: The [`<td>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td \"The HTML <td> element defines a cell of a table that contains data. It participates in the table model.\") element should be styled using [CSS](https://developer.mozilla.org/en-US/docs/CSS). To create a similar effect use the [`background-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color \"The background-color CSS property sets the background color of an element.\") property in [CSS](https://developer.mozilla.org/en-US/docs/CSS) instead."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/td"
                }
            ]
        },
        {
            "name": "th",
            "description": {
                "kind": "markdown",
                "value": "The th element represents a header cell in a table."
            },
            "attributes": [
                {
                    "name": "colspan"
                },
                {
                    "name": "rowspan"
                },
                {
                    "name": "headers"
                },
                {
                    "name": "scope",
                    "valueSet": "s"
                },
                {
                    "name": "sorted"
                },
                {
                    "name": "abbr",
                    "description": {
                        "kind": "markdown",
                        "value": "This attribute contains a short abbreviated description of the cell's content. Some user-agents, such as speech readers, may present this description before the content itself."
                    }
                },
                {
                    "name": "align",
                    "description": "This enumerated attribute specifies how the cell content's horizontal alignment will be handled. Possible values are:\n\n*   `left`: The content is aligned to the left of the cell.\n*   `center`: The content is centered in the cell.\n*   `right`: The content is aligned to the right of the cell.\n*   `justify` (with text only): The content is stretched out inside the cell so that it covers its entire width.\n*   `char` (with text only): The content is aligned to a character inside the `<th>` element with minimal offset. This character is defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-charoff) attributes.\n\nThe default value when this attribute is not specified is `left`.\n\n**Note:** Do not use this attribute as it is obsolete in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values, apply the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align \"The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.\") property to the element.\n*   To achieve the same effect as the `char` value, give the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align \"The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.\") property the same value you would use for the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-char). Unimplemented in CSS3."
                },
                {
                    "name": "axis",
                    "description": "This attribute contains a list of space-separated strings. Each string is the `id` of a group of cells that this header applies to.\n\n**Note:** Do not use this attribute as it is obsolete in the latest standard: use the [`scope`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-scope) attribute instead."
                },
                {
                    "name": "bgcolor",
                    "description": "This attribute defines the background color of each cell in a column. It consists of a 6-digit hexadecimal code as defined in [sRGB](https://www.w3.org/Graphics/Color/sRGB) and is prefixed by '#'. This attribute may be used with one of sixteen predefined color strings:\n\n \n\n`black` = \"#000000\"\n\n \n\n`green` = \"#008000\"\n\n \n\n`silver` = \"#C0C0C0\"\n\n \n\n`lime` = \"#00FF00\"\n\n \n\n`gray` = \"#808080\"\n\n \n\n`olive` = \"#808000\"\n\n \n\n`white` = \"#FFFFFF\"\n\n \n\n`yellow` = \"#FFFF00\"\n\n \n\n`maroon` = \"#800000\"\n\n \n\n`navy` = \"#000080\"\n\n \n\n`red` = \"#FF0000\"\n\n \n\n`blue` = \"#0000FF\"\n\n \n\n`purple` = \"#800080\"\n\n \n\n`teal` = \"#008080\"\n\n \n\n`fuchsia` = \"#FF00FF\"\n\n \n\n`aqua` = \"#00FFFF\"\n\n**Note:** Do not use this attribute, as it is non-standard and only implemented in some versions of Microsoft Internet Explorer: The [`<th>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th \"The HTML <th> element defines a cell as header of a group of table cells. The exact nature of this group is defined by the scope and headers attributes.\") element should be styled using [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS). To create a similar effect use the [`background-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color \"The background-color CSS property sets the background color of an element.\") property in [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) instead."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/th"
                }
            ]
        },
        {
            "name": "form",
            "description": {
                "kind": "markdown",
                "value": "The form element represents a collection of form-associated elements, some of which can represent editable values that can be submitted to a server for processing."
            },
            "attributes": [
                {
                    "name": "accept-charset",
                    "description": {
                        "kind": "markdown",
                        "value": "A space- or comma-delimited list of character encodings that the server accepts. The browser uses them in the order in which they are listed. The default value, the reserved string `\"UNKNOWN\"`, indicates the same encoding as that of the document containing the form element.  \nIn previous versions of HTML, the different character encodings could be delimited by spaces or commas. In HTML5, only spaces are allowed as delimiters."
                    }
                },
                {
                    "name": "action",
                    "description": {
                        "kind": "markdown",
                        "value": "The URI of a program that processes the form information. This value can be overridden by a [`formaction`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formaction) attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button \"The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.\") or [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input \"The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.\") element."
                    }
                },
                {
                    "name": "autocomplete",
                    "valueSet": "o",
                    "description": {
                        "kind": "markdown",
                        "value": "Indicates whether input elements can by default have their values automatically completed by the browser. This setting can be overridden by an `autocomplete` attribute on an element belonging to the form. Possible values are:\n\n*   `off`: The user must explicitly enter a value into each field for every use, or the document provides its own auto-completion method; the browser does not automatically complete entries.\n*   `on`: The browser can automatically complete values based on values that the user has previously entered in the form.\n\nFor most modern browsers (including Firefox 38+, Google Chrome 34+, IE 11+) setting the autocomplete attribute will not prevent a browser's password manager from asking the user if they want to store login fields (username and password), if the user permits the storage the browser will autofill the login the next time the user visits the page. See [The autocomplete attribute and login fields](https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion#The_autocomplete_attribute_and_login_fields)."
                    }
                },
                {
                    "name": "enctype",
                    "valueSet": "et",
                    "description": {
                        "kind": "markdown",
                        "value": "When the value of the `method` attribute is `post`, enctype is the [MIME type](https://en.wikipedia.org/wiki/Mime_type) of content that is used to submit the form to the server. Possible values are:\n\n*   `application/x-www-form-urlencoded`: The default value if the attribute is not specified.\n*   `multipart/form-data`: The value used for an [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input \"The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.\") element with the `type` attribute set to \"file\".\n*   `text/plain`: (HTML5)\n\nThis value can be overridden by a [`formenctype`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formenctype) attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button \"The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.\") or [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input \"The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.\") element."
                    }
                },
                {
                    "name": "method",
                    "valueSet": "m",
                    "description": {
                        "kind": "markdown",
                        "value": "The [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP) method that the browser uses to submit the form. Possible values are:\n\n*   `post`: Corresponds to the HTTP [POST method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.5) ; form data are included in the body of the form and sent to the server.\n*   `get`: Corresponds to the HTTP [GET method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.3); form data are appended to the `action` attribute URI with a '?' as separator, and the resulting URI is sent to the server. Use this method when the form has no side-effects and contains only ASCII characters.\n*   `dialog`: Use when the form is inside a [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog \"The HTML <dialog> element represents a dialog box or other interactive component, such as an inspector or window.\") element to close the dialog when submitted.\n\nThis value can be overridden by a [`formmethod`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formmethod) attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button \"The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.\") or [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input \"The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.\") element."
                    }
                },
                {
                    "name": "name",
                    "description": {
                        "kind": "markdown",
                        "value": "The name of the form. In HTML 4, its use is deprecated (`id` should be used instead). It must be unique among the forms in a document and not just an empty string in HTML 5."
                    }
                },
                {
                    "name": "novalidate",
                    "valueSet": "v",
                    "description": {
                        "kind": "markdown",
                        "value": "This Boolean attribute indicates that the form is not to be validated when submitted. If this attribute is not specified (and therefore the form is validated), this default setting can be overridden by a [`formnovalidate`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formnovalidate) attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button \"The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.\") or [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input \"The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.\") element belonging to the form."
                    }
                },
                {
                    "name": "target",
                    "description": {
                        "kind": "markdown",
                        "value": "A name or keyword indicating where to display the response that is received after submitting the form. In HTML 4, this is the name/keyword for a frame. In HTML5, it is a name/keyword for a _browsing context_ (for example, tab, window, or inline frame). The following keywords have special meanings:\n\n*   `_self`: Load the response into the same HTML 4 frame (or HTML5 browsing context) as the current one. This value is the default if the attribute is not specified.\n*   `_blank`: Load the response into a new unnamed HTML 4 window or HTML5 browsing context.\n*   `_parent`: Load the response into the HTML 4 frameset parent of the current frame, or HTML5 parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.\n*   `_top`: HTML 4: Load the response into the full original window, and cancel all other frames. HTML5: Load the response into the top-level browsing context (i.e., the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`.\n*   _iframename_: The response is displayed in a named [`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe \"The HTML Inline Frame element (<iframe>) represents a nested browsing context, embedding another HTML page into the current one.\").\n\nHTML5: This value can be overridden by a [`formtarget`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formtarget) attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button \"The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.\") or [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input \"The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.\") element."
                    }
                },
                {
                    "name": "accept",
                    "description": "A comma-separated list of content types that the server accepts.\n\n**Usage note:** This attribute has been removed in HTML5 and should no longer be used. Instead, use the [`accept`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept) attribute of the specific [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input \"The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.\") element."
                },
                {
                    "name": "autocapitalize",
                    "description": "This is a nonstandard attribute used by iOS Safari Mobile which controls whether and how the text value for textual form control descendants should be automatically capitalized as it is entered/edited by the user. If the `autocapitalize` attribute is specified on an individual form control descendant, it trumps the form-wide `autocapitalize` setting. The non-deprecated values are available in iOS 5 and later. The default value is `sentences`. Possible values are:\n\n*   `none`: Completely disables automatic capitalization\n*   `sentences`: Automatically capitalize the first letter of sentences.\n*   `words`: Automatically capitalize the first letter of words.\n*   `characters`: Automatically capitalize all characters.\n*   `on`: Deprecated since iOS 5.\n*   `off`: Deprecated since iOS 5."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/form"
                }
            ]
        },
        {
            "name": "label",
            "description": {
                "kind": "markdown",
                "value": "The label element represents a caption in a user interface. The caption can be associated with a specific form control, known as the label element's labeled control, either using the for attribute, or by putting the form control inside the label element itself."
            },
            "attributes": [
                {
                    "name": "form",
                    "description": {
                        "kind": "markdown",
                        "value": "The [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form \"The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.\") element with which the label is associated (its _form owner_). If specified, the value of the attribute is the `id` of a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form \"The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.\") element in the same document. This lets you place label elements anywhere within a document, not just as descendants of their form elements."
                    }
                },
                {
                    "name": "for",
                    "description": {
                        "kind": "markdown",
                        "value": "The [`id`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#attr-id) of a [labelable](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Form_labelable) form-related element in the same document as the `<label>` element. The first element in the document with an `id` matching the value of the `for` attribute is the _labeled control_ for this label element, if it is a labelable element. If it is not labelable then the `for` attribute has no effect. If there are other elements which also match the `id` value, later in the document, they are not considered.\n\n**Note**: A `<label>` element can have both a `for` attribute and a contained control element, as long as the `for` attribute points to the contained control element."
                    }
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/label"
                }
            ]
        },
        {
            "name": "input",
            "description": {
                "kind": "markdown",
                "value": "The input element represents a typed data field, usually with a form control to allow the user to edit the data."
            },
            "attributes": [
                {
                    "name": "accept"
                },
                {
                    "name": "alt"
                },
                {
                    "name": "autocomplete",
                    "valueSet": "inputautocomplete"
                },
                {
                    "name": "autofocus",
                    "valueSet": "v"
                },
                {
                    "name": "checked",
                    "valueSet": "v"
                },
                {
                    "name": "dirname"
                },
                {
                    "name": "disabled",
                    "valueSet": "v"
                },
                {
                    "name": "form"
                },
                {
                    "name": "formaction"
                },
                {
                    "name": "formenctype",
                    "valueSet": "et"
                },
                {
                    "name": "formmethod",
                    "valueSet": "fm"
                },
                {
                    "name": "formnovalidate",
                    "valueSet": "v"
                },
                {
                    "name": "formtarget"
                },
                {
                    "name": "height"
                },
                {
                    "name": "inputmode",
                    "valueSet": "im"
                },
                {
                    "name": "list"
                },
                {
                    "name": "max"
                },
                {
                    "name": "maxlength"
                },
                {
                    "name": "min"
                },
                {
                    "name": "minlength"
                },
                {
                    "name": "multiple",
                    "valueSet": "v"
                },
                {
                    "name": "name"
                },
                {
                    "name": "pattern"
                },
                {
                    "name": "placeholder"
                },
                {
                    "name": "readonly",
                    "valueSet": "v"
                },
                {
                    "name": "required",
                    "valueSet": "v"
                },
                {
                    "name": "size"
                },
                {
                    "name": "src"
                },
                {
                    "name": "step"
                },
                {
                    "name": "type",
                    "valueSet": "t"
                },
                {
                    "name": "value"
                },
                {
                    "name": "width"
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/input"
                }
            ]
        },
        {
            "name": "button",
            "description": {
                "kind": "markdown",
                "value": "The button element represents a button labeled by its contents."
            },
            "attributes": [
                {
                    "name": "autofocus",
                    "valueSet": "v",
                    "description": {
                        "kind": "markdown",
                        "value": "This Boolean attribute lets you specify that the button should have input focus when the page loads, unless the user overrides it, for example by typing in a different control. Only one form-associated element in a document can have this attribute specified."
                    }
                },
                {
                    "name": "disabled",
                    "valueSet": "v",
                    "description": {
                        "kind": "markdown",
                        "value": "This Boolean attribute indicates that the user cannot interact with the button. If this attribute is not specified, the button inherits its setting from the containing element, for example [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset \"The HTML <fieldset> element is used to group several controls as well as labels (<label>) within a web form.\"); if there is no containing element with the **disabled** attribute set, then the button is enabled.\n\nFirefox will, unlike other browsers, by default, [persist the dynamic disabled state](https://stackoverflow.com/questions/5985839/bug-with-firefox-disabled-attribute-of-input-not-resetting-when-refreshing) of a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button \"The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.\") across page loads. Use the [`autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-autocomplete) attribute to control this feature."
                    }
                },
                {
                    "name": "form",
                    "description": {
                        "kind": "markdown",
                        "value": "The form element that the button is associated with (its _form owner_). The value of the attribute must be the **id** attribute of a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form \"The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.\") element in the same document. If this attribute is not specified, the `<button>` element will be associated to an ancestor [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form \"The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.\") element, if one exists. This attribute enables you to associate `<button>` elements to [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form \"The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.\") elements anywhere within a document, not just as descendants of [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form \"The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.\") elements."
                    }
                },
                {
                    "name": "formaction",
                    "description": {
                        "kind": "markdown",
                        "value": "The URI of a program that processes the information submitted by the button. If specified, it overrides the [`action`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-action) attribute of the button's form owner."
                    }
                },
                {
                    "name": "formenctype",
                    "valueSet": "et",
                    "description": {
                        "kind": "markdown",
                        "value": "If the button is a submit button, this attribute specifies the type of content that is used to submit the form to the server. Possible values are:\n\n*   `application/x-www-form-urlencoded`: The default value if the attribute is not specified.\n*   `multipart/form-data`: Use this value if you are using an [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input \"The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.\") element with the [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-type) attribute set to `file`.\n*   `text/plain`\n\nIf this attribute is specified, it overrides the [`enctype`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-enctype) attribute of the button's form owner."
                    }
                },
                {
                    "name": "formmethod",
                    "valueSet": "fm",
                    "description": {
                        "kind": "markdown",
                        "value": "If the button is a submit button, this attribute specifies the HTTP method that the browser uses to submit the form. Possible values are:\n\n*   `post`: The data from the form are included in the body of the form and sent to the server.\n*   `get`: The data from the form are appended to the **form** attribute URI, with a '?' as a separator, and the resulting URI is sent to the server. Use this method when the form has no side-effects and contains only ASCII characters.\n\nIf specified, this attribute overrides the [`method`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-method) attribute of the button's form owner."
                    }
                },
                {
                    "name": "formnovalidate",
                    "valueSet": "v",
                    "description": {
                        "kind": "markdown",
                        "value": "If the button is a submit button, this Boolean attribute specifies that the form is not to be validated when it is submitted. If this attribute is specified, it overrides the [`novalidate`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-novalidate) attribute of the button's form owner."
                    }
                },
                {
                    "name": "formtarget",
                    "description": {
                        "kind": "markdown",
                        "value": "If the button is a submit button, this attribute is a name or keyword indicating where to display the response that is received after submitting the form. This is a name of, or keyword for, a _browsing context_ (for example, tab, window, or inline frame). If this attribute is specified, it overrides the [`target`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-target) attribute of the button's form owner. The following keywords have special meanings:\n\n*   `_self`: Load the response into the same browsing context as the current one. This value is the default if the attribute is not specified.\n*   `_blank`: Load the response into a new unnamed browsing context.\n*   `_parent`: Load the response into the parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.\n*   `_top`: Load the response into the top-level browsing context (that is, the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`."
                    }
                },
                {
                    "name": "name",
                    "description": {
                        "kind": "markdown",
                        "value": "The name of the button, which is submitted with the form data."
                    }
                },
                {
                    "name": "type",
                    "valueSet": "bt",
                    "description": {
                        "kind": "markdown",
                        "value": "The type of the button. Possible values are:\n\n*   `submit`: The button submits the form data to the server. This is the default if the attribute is not specified, or if the attribute is dynamically changed to an empty or invalid value.\n*   `reset`: The button resets all the controls to their initial values.\n*   `button`: The button has no default behavior. It can have client-side scripts associated with the element's events, which are triggered when the events occur."
                    }
                },
                {
                    "name": "value",
                    "description": {
                        "kind": "markdown",
                        "value": "The initial value of the button. It defines the value associated with the button which is submitted with the form data. This value is passed to the server in params when the form is submitted."
                    }
                },
                {
                    "name": "autocomplete",
                    "description": "The use of this attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button \"The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.\") is nonstandard and Firefox-specific. By default, unlike other browsers, [Firefox persists the dynamic disabled state](https://stackoverflow.com/questions/5985839/bug-with-firefox-disabled-attribute-of-input-not-resetting-when-refreshing) of a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button \"The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.\") across page loads. Setting the value of this attribute to `off` (i.e. `autocomplete=\"off\"`) disables this feature. See [bug 654072](https://bugzilla.mozilla.org/show_bug.cgi?id=654072 \"if disabled state is changed with javascript, the normal state doesn't return after refreshing the page\")."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/button"
                }
            ]
        },
        {
            "name": "select",
            "description": {
                "kind": "markdown",
                "value": "The select element represents a control for selecting amongst a set of options."
            },
            "attributes": [
                {
                    "name": "autocomplete",
                    "valueSet": "inputautocomplete",
                    "description": {
                        "kind": "markdown",
                        "value": "A [`DOMString`](https://developer.mozilla.org/en-US/docs/Web/API/DOMString \"DOMString is a UTF-16 String. As JavaScript already uses such strings, DOMString is mapped directly to a String.\") providing a hint for a [user agent's](https://developer.mozilla.org/en-US/docs/Glossary/user_agent \"user agent's: A user agent is a computer program representing a person, for example, a browser in a Web context.\") autocomplete feature. See [The HTML autocomplete attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for a complete list of values and details on how to use autocomplete."
                    }
                },
                {
                    "name": "autofocus",
                    "valueSet": "v",
                    "description": {
                        "kind": "markdown",
                        "value": "This Boolean attribute lets you specify that a form control should have input focus when the page loads. Only one form element in a document can have the `autofocus` attribute."
                    }
                },
                {
                    "name": "disabled",
                    "valueSet": "v",
                    "description": {
                        "kind": "markdown",
                        "value": "This Boolean attribute indicates that the user cannot interact with the control. If this attribute is not specified, the control inherits its setting from the containing element, for example `fieldset`; if there is no containing element with the `disabled` attribute set, then the control is enabled."
                    }
                },
                {
                    "name": "form",
                    "description": {
                        "kind": "markdown",
                        "value": "This attribute lets you specify the form element to which the select element is associated (that is, its \"form owner\"). If this attribute is specified, its value must be the same as the `id` of a form element in the same document. This enables you to place select elements anywhere within a document, not just as descendants of their form elements."
                    }
                },
                {
                    "name": "multiple",
                    "valueSet": "v",
                    "description": {
                        "kind": "markdown",
                        "value": "This Boolean attribute indicates that multiple options can be selected in the list. If it is not specified, then only one option can be selected at a time. When `multiple` is specified, most browsers will show a scrolling list box instead of a single line dropdown."
                    }
                },
                {
                    "name": "name",
                    "description": {
                        "kind": "markdown",
                        "value": "This attribute is used to specify the name of the control."
                    }
                },
                {
                    "name": "required",
                    "valueSet": "v",
                    "description": {
                        "kind": "markdown",
                        "value": "A Boolean attribute indicating that an option with a non-empty string value must be selected."
                    }
                },
                {
                    "name": "size",
                    "description": {
                        "kind": "markdown",
                        "value": "If the control is presented as a scrolling list box (e.g. when `multiple` is specified), this attribute represents the number of rows in the list that should be visible at one time. Browsers are not required to present a select element as a scrolled list box. The default value is 0.\n\n**Note:** According to the HTML5 specification, the default value for size should be 1; however, in practice, this has been found to break some web sites, and no other browser currently does that, so Mozilla has opted to continue to return 0 for the time being with Firefox."
                    }
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/select"
                }
            ]
        },
        {
            "name": "datalist",
            "description": {
                "kind": "markdown",
                "value": "The datalist element represents a set of option elements that represent predefined options for other controls. In the rendering, the datalist element represents nothing and it, along with its children, should be hidden."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/datalist"
                }
            ]
        },
        {
            "name": "optgroup",
            "description": {
                "kind": "markdown",
                "value": "The optgroup element represents a group of option elements with a common label."
            },
            "attributes": [
                {
                    "name": "disabled",
                    "valueSet": "v",
                    "description": {
                        "kind": "markdown",
                        "value": "If this Boolean attribute is set, none of the items in this option group is selectable. Often browsers grey out such control and it won't receive any browsing events, like mouse clicks or focus-related ones."
                    }
                },
                {
                    "name": "label",
                    "description": {
                        "kind": "markdown",
                        "value": "The name of the group of options, which the browser can use when labeling the options in the user interface. This attribute is mandatory if this element is used."
                    }
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/optgroup"
                }
            ]
        },
        {
            "name": "option",
            "description": {
                "kind": "markdown",
                "value": "The option element represents an option in a select element or as part of a list of suggestions in a datalist element."
            },
            "attributes": [
                {
                    "name": "disabled",
                    "valueSet": "v",
                    "description": {
                        "kind": "markdown",
                        "value": "If this Boolean attribute is set, this option is not checkable. Often browsers grey out such control and it won't receive any browsing event, like mouse clicks or focus-related ones. If this attribute is not set, the element can still be disabled if one of its ancestors is a disabled [`<optgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup \"The HTML <optgroup> element creates a grouping of options within a <select> element.\") element."
                    }
                },
                {
                    "name": "label",
                    "description": {
                        "kind": "markdown",
                        "value": "This attribute is text for the label indicating the meaning of the option. If the `label` attribute isn't defined, its value is that of the element text content."
                    }
                },
                {
                    "name": "selected",
                    "valueSet": "v",
                    "description": {
                        "kind": "markdown",
                        "value": "If present, this Boolean attribute indicates that the option is initially selected. If the `<option>` element is the descendant of a [`<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select \"The HTML <select> element represents a control that provides a menu of options\") element whose [`multiple`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#attr-multiple) attribute is not set, only one single `<option>` of this [`<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select \"The HTML <select> element represents a control that provides a menu of options\") element may have the `selected` attribute."
                    }
                },
                {
                    "name": "value",
                    "description": {
                        "kind": "markdown",
                        "value": "The content of this attribute represents the value to be submitted with the form, should this option be selected. If this attribute is omitted, the value is taken from the text content of the option element."
                    }
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/option"
                }
            ]
        },
        {
            "name": "textarea",
            "description": {
                "kind": "markdown",
                "value": "The textarea element represents a multiline plain text edit control for the element's raw value. The contents of the control represent the control's default value."
            },
            "attributes": [
                {
                    "name": "autocomplete",
                    "valueSet": "inputautocomplete",
                    "description": {
                        "kind": "markdown",
                        "value": "This attribute indicates whether the value of the control can be automatically completed by the browser. Possible values are:\n\n*   `off`: The user must explicitly enter a value into this field for every use, or the document provides its own auto-completion method; the browser does not automatically complete the entry.\n*   `on`: The browser can automatically complete the value based on values that the user has entered during previous uses.\n\nIf the `autocomplete` attribute is not specified on a `<textarea>` element, then the browser uses the `autocomplete` attribute value of the `<textarea>` element's form owner. The form owner is either the [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form \"The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.\") element that this `<textarea>` element is a descendant of or the form element whose `id` is specified by the `form` attribute of the input element. For more information, see the [`autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-autocomplete) attribute in [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form \"The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.\")."
                    }
                },
                {
                    "name": "autofocus",
                    "valueSet": "v",
                    "description": {
                        "kind": "markdown",
                        "value": "This Boolean attribute lets you specify that a form control should have input focus when the page loads. Only one form-associated element in a document can have this attribute specified."
                    }
                },
                {
                    "name": "cols",
                    "description": {
                        "kind": "markdown",
                        "value": "The visible width of the text control, in average character widths. If it is specified, it must be a positive integer. If it is not specified, the default value is `20`."
                    }
                },
                {
                    "name": "dirname"
                },
                {
                    "name": "disabled",
                    "valueSet": "v",
                    "description": {
                        "kind": "markdown",
                        "value": "This Boolean attribute indicates that the user cannot interact with the control. If this attribute is not specified, the control inherits its setting from the containing element, for example [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset \"The HTML <fieldset> element is used to group several controls as well as labels (<label>) within a web form.\"); if there is no containing element when the `disabled` attribute is set, the control is enabled."
                    }
                },
                {
                    "name": "form",
                    "description": {
                        "kind": "markdown",
                        "value": "The form element that the `<textarea>` element is associated with (its \"form owner\"). The value of the attribute must be the `id` of a form element in the same document. If this attribute is not specified, the `<textarea>` element must be a descendant of a form element. This attribute enables you to place `<textarea>` elements anywhere within a document, not just as descendants of form elements."
                    }
                },
                {
                    "name": "inputmode",
                    "valueSet": "im"
                },
                {
                    "name": "maxlength",
                    "description": {
                        "kind": "markdown",
                        "value": "The maximum number of characters (unicode code points) that the user can enter. If this value isn't specified, the user can enter an unlimited number of characters."
                    }
                },
                {
                    "name": "minlength",
                    "description": {
                        "kind": "markdown",
                        "value": "The minimum number of characters (unicode code points) required that the user should enter."
                    }
                },
                {
                    "name": "name",
                    "description": {
                        "kind": "markdown",
                        "value": "The name of the control."
                    }
                },
                {
                    "name": "placeholder",
                    "description": {
                        "kind": "markdown",
                        "value": "A hint to the user of what can be entered in the control. Carriage returns or line-feeds within the placeholder text must be treated as line breaks when rendering the hint.\n\n**Note:** Placeholders should only be used to show an example of the type of data that should be entered into a form; they are _not_ a substitute for a proper [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label \"The HTML <label> element represents a caption for an item in a user interface.\") element tied to the input. See [Labels and placeholders](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Labels_and_placeholders \"The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.\") in [<input>: The Input (Form Input) element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input \"The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.\") for a full explanation."
                    }
                },
                {
                    "name": "readonly",
                    "valueSet": "v",
                    "description": {
                        "kind": "markdown",
                        "value": "This Boolean attribute indicates that the user cannot modify the value of the control. Unlike the `disabled` attribute, the `readonly` attribute does not prevent the user from clicking or selecting in the control. The value of a read-only control is still submitted with the form."
                    }
                },
                {
                    "name": "required",
                    "valueSet": "v",
                    "description": {
                        "kind": "markdown",
                        "value": "This attribute specifies that the user must fill in a value before submitting a form."
                    }
                },
                {
                    "name": "rows",
                    "description": {
                        "kind": "markdown",
                        "value": "The number of visible text lines for the control."
                    }
                },
                {
                    "name": "wrap",
                    "valueSet": "w",
                    "description": {
                        "kind": "markdown",
                        "value": "Indicates how the control wraps text. Possible values are:\n\n*   `hard`: The browser automatically inserts line breaks (CR+LF) so that each line has no more than the width of the control; the `cols` attribute must also be specified for this to take effect.\n*   `soft`: The browser ensures that all line breaks in the value consist of a CR+LF pair, but does not insert any additional line breaks.\n*   `off` : Like `soft` but changes appearance to `white-space: pre` so line segments exceeding `cols` are not wrapped and the `<textarea>` becomes horizontally scrollable.\n\nIf this attribute is not specified, `soft` is its default value."
                    }
                },
                {
                    "name": "autocapitalize",
                    "description": "This is a non-standard attribute supported by WebKit on iOS (therefore nearly all browsers running on iOS, including Safari, Firefox, and Chrome), which controls whether and how the text value should be automatically capitalized as it is entered/edited by the user. The non-deprecated values are available in iOS 5 and later. Possible values are:\n\n*   `none`: Completely disables automatic capitalization.\n*   `sentences`: Automatically capitalize the first letter of sentences.\n*   `words`: Automatically capitalize the first letter of words.\n*   `characters`: Automatically capitalize all characters.\n*   `on`: Deprecated since iOS 5.\n*   `off`: Deprecated since iOS 5."
                },
                {
                    "name": "spellcheck",
                    "description": "Specifies whether the `<textarea>` is subject to spell checking by the underlying browser/OS. the value can be:\n\n*   `true`: Indicates that the element needs to have its spelling and grammar checked.\n*   `default` : Indicates that the element is to act according to a default behavior, possibly based on the parent element's own `spellcheck` value.\n*   `false` : Indicates that the element should not be spell checked."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/textarea"
                }
            ]
        },
        {
            "name": "output",
            "description": {
                "kind": "markdown",
                "value": "The output element represents the result of a calculation performed by the application, or the result of a user action."
            },
            "attributes": [
                {
                    "name": "for",
                    "description": {
                        "kind": "markdown",
                        "value": "A space-separated list of other elements’ [`id`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id)s, indicating that those elements contributed input values to (or otherwise affected) the calculation."
                    }
                },
                {
                    "name": "form",
                    "description": {
                        "kind": "markdown",
                        "value": "The [form element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) that this element is associated with (its \"form owner\"). The value of the attribute must be an `id` of a form element in the same document. If this attribute is not specified, the output element must be a descendant of a form element. This attribute enables you to place output elements anywhere within a document, not just as descendants of their form elements."
                    }
                },
                {
                    "name": "name",
                    "description": {
                        "kind": "markdown",
                        "value": "The name of the element, exposed in the [`HTMLFormElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement \"The HTMLFormElement interface represents a <form> element in the DOM; it allows access to and in some cases modification of aspects of the form, as well as access to its component elements.\") API."
                    }
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/output"
                }
            ]
        },
        {
            "name": "progress",
            "description": {
                "kind": "markdown",
                "value": "The progress element represents the completion progress of a task. The progress is either indeterminate, indicating that progress is being made but that it is not clear how much more work remains to be done before the task is complete (e.g. because the task is waiting for a remote host to respond), or the progress is a number in the range zero to a maximum, giving the fraction of work that has so far been completed."
            },
            "attributes": [
                {
                    "name": "value",
                    "description": {
                        "kind": "markdown",
                        "value": "This attribute specifies how much of the task that has been completed. It must be a valid floating point number between 0 and `max`, or between 0 and 1 if `max` is omitted. If there is no `value` attribute, the progress bar is indeterminate; this indicates that an activity is ongoing with no indication of how long it is expected to take."
                    }
                },
                {
                    "name": "max",
                    "description": {
                        "kind": "markdown",
                        "value": "This attribute describes how much work the task indicated by the `progress` element requires. The `max` attribute, if present, must have a value greater than zero and be a valid floating point number. The default value is 1."
                    }
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/progress"
                }
            ]
        },
        {
            "name": "meter",
            "description": {
                "kind": "markdown",
                "value": "The meter element represents a scalar measurement within a known range, or a fractional value; for example disk usage, the relevance of a query result, or the fraction of a voting population to have selected a particular candidate."
            },
            "attributes": [
                {
                    "name": "value",
                    "description": {
                        "kind": "markdown",
                        "value": "The current numeric value. This must be between the minimum and maximum values (`min` attribute and `max` attribute) if they are specified. If unspecified or malformed, the value is 0. If specified, but not within the range given by the `min` attribute and `max` attribute, the value is equal to the nearest end of the range.\n\n**Usage note:** Unless the `value` attribute is between `0` and `1` (inclusive), the `min` and `max` attributes should define the range so that the `value` attribute's value is within it."
                    }
                },
                {
                    "name": "min",
                    "description": {
                        "kind": "markdown",
                        "value": "The lower numeric bound of the measured range. This must be less than the maximum value (`max` attribute), if specified. If unspecified, the minimum value is 0."
                    }
                },
                {
                    "name": "max",
                    "description": {
                        "kind": "markdown",
                        "value": "The upper numeric bound of the measured range. This must be greater than the minimum value (`min` attribute), if specified. If unspecified, the maximum value is 1."
                    }
                },
                {
                    "name": "low",
                    "description": {
                        "kind": "markdown",
                        "value": "The upper numeric bound of the low end of the measured range. This must be greater than the minimum value (`min` attribute), and it also must be less than the high value and maximum value (`high` attribute and `max` attribute, respectively), if any are specified. If unspecified, or if less than the minimum value, the `low` value is equal to the minimum value."
                    }
                },
                {
                    "name": "high",
                    "description": {
                        "kind": "markdown",
                        "value": "The lower numeric bound of the high end of the measured range. This must be less than the maximum value (`max` attribute), and it also must be greater than the low value and minimum value (`low` attribute and **min** attribute, respectively), if any are specified. If unspecified, or if greater than the maximum value, the `high` value is equal to the maximum value."
                    }
                },
                {
                    "name": "optimum",
                    "description": {
                        "kind": "markdown",
                        "value": "This attribute indicates the optimal numeric value. It must be within the range (as defined by the `min` attribute and `max` attribute). When used with the `low` attribute and `high` attribute, it gives an indication where along the range is considered preferable. For example, if it is between the `min` attribute and the `low` attribute, then the lower range is considered preferred."
                    }
                },
                {
                    "name": "form",
                    "description": "This attribute associates the element with a `form` element that has ownership of the `meter` element. For example, a `meter` might be displaying a range corresponding to an `input` element of `type` _number_. This attribute is only used if the `meter` element is being used as a form-associated element; even then, it may be omitted if the element appears as a descendant of a `form` element."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/meter"
                }
            ]
        },
        {
            "name": "fieldset",
            "description": {
                "kind": "markdown",
                "value": "The fieldset element represents a set of form controls optionally grouped under a common name."
            },
            "attributes": [
                {
                    "name": "disabled",
                    "valueSet": "v",
                    "description": {
                        "kind": "markdown",
                        "value": "If this Boolean attribute is set, all form controls that are descendants of the `<fieldset>`, are disabled, meaning they are not editable and won't be submitted along with the `<form>`. They won't receive any browsing events, like mouse clicks or focus-related events. By default browsers display such controls grayed out. Note that form elements inside the [`<legend>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend \"The HTML <legend> element represents a caption for the content of its parent <fieldset>.\") element won't be disabled."
                    }
                },
                {
                    "name": "form",
                    "description": {
                        "kind": "markdown",
                        "value": "This attribute takes the value of the `id` attribute of a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form \"The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.\") element you want the `<fieldset>` to be part of, even if it is not inside the form."
                    }
                },
                {
                    "name": "name",
                    "description": {
                        "kind": "markdown",
                        "value": "The name associated with the group.\n\n**Note**: The caption for the fieldset is given by the first [`<legend>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend \"The HTML <legend> element represents a caption for the content of its parent <fieldset>.\") element nested inside it."
                    }
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/fieldset"
                }
            ]
        },
        {
            "name": "legend",
            "description": {
                "kind": "markdown",
                "value": "The legend element represents a caption for the rest of the contents of the legend element's parent fieldset element, if any."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/legend"
                }
            ]
        },
        {
            "name": "details",
            "description": {
                "kind": "markdown",
                "value": "The details element represents a disclosure widget from which the user can obtain additional information or controls."
            },
            "attributes": [
                {
                    "name": "open",
                    "valueSet": "v",
                    "description": {
                        "kind": "markdown",
                        "value": "This Boolean attribute indicates whether or not the details — that is, the contents of the `<details>` element — are currently visible. The default, `false`, means the details are not visible."
                    }
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/details"
                }
            ]
        },
        {
            "name": "summary",
            "description": {
                "kind": "markdown",
                "value": "The summary element represents a summary, caption, or legend for the rest of the contents of the summary element's parent details element, if any."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/summary"
                }
            ]
        },
        {
            "name": "dialog",
            "description": {
                "kind": "markdown",
                "value": "The dialog element represents a part of an application that a user interacts with to perform a task, for example a dialog box, inspector, or window."
            },
            "attributes": [
                {
                    "name": "open",
                    "description": "Indicates that the dialog is active and available for interaction. When the `open` attribute is not set, the dialog shouldn't be shown to the user."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/dialog"
                }
            ]
        },
        {
            "name": "script",
            "description": {
                "kind": "markdown",
                "value": "The script element allows authors to include dynamic script and data blocks in their documents. The element does not represent content for the user."
            },
            "attributes": [
                {
                    "name": "src",
                    "description": {
                        "kind": "markdown",
                        "value": "This attribute specifies the URI of an external script; this can be used as an alternative to embedding a script directly within a document.\n\nIf a `script` element has a `src` attribute specified, it should not have a script embedded inside its tags."
                    }
                },
                {
                    "name": "type",
                    "description": {
                        "kind": "markdown",
                        "value": "This attribute indicates the type of script represented. The value of this attribute will be in one of the following categories:\n\n*   **Omitted or a JavaScript MIME type:** For HTML5-compliant browsers this indicates the script is JavaScript. HTML5 specification urges authors to omit the attribute rather than provide a redundant MIME type. In earlier browsers, this identified the scripting language of the embedded or imported (via the `src` attribute) code. JavaScript MIME types are [listed in the specification](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#JavaScript_types).\n*   **`module`:** For HTML5-compliant browsers the code is treated as a JavaScript module. The processing of the script contents is not affected by the `charset` and `defer` attributes. For information on using `module`, see [ES6 in Depth: Modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/). Code may behave differently when the `module` keyword is used.\n*   **Any other value:** The embedded content is treated as a data block which won't be processed by the browser. Developers must use a valid MIME type that is not a JavaScript MIME type to denote data blocks. The `src` attribute will be ignored.\n\n**Note:** in Firefox you could specify the version of JavaScript contained in a `<script>` element by including a non-standard `version` parameter inside the `type` attribute — for example `type=\"text/javascript;version=1.8\"`. This has been removed in Firefox 59 (see [bug 1428745](https://bugzilla.mozilla.org/show_bug.cgi?id=1428745 \"FIXED: Remove support for version parameter from script loader\"))."
                    }
                },
                {
                    "name": "charset"
                },
                {
                    "name": "async",
                    "valueSet": "v",
                    "description": {
                        "kind": "markdown",
                        "value": "This is a Boolean attribute indicating that the browser should, if possible, load the script asynchronously.\n\nThis attribute must not be used if the `src` attribute is absent (i.e. for inline scripts). If it is included in this case it will have no effect.\n\nBrowsers usually assume the worst case scenario and load scripts synchronously, (i.e. `async=\"false\"`) during HTML parsing.\n\nDynamically inserted scripts (using [`document.createElement()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement \"In an HTML document, the document.createElement() method creates the HTML element specified by tagName, or an HTMLUnknownElement if tagName isn't recognized.\")) load asynchronously by default, so to turn on synchronous loading (i.e. scripts load in the order they were inserted) set `async=\"false\"`.\n\nSee [Browser compatibility](#Browser_compatibility) for notes on browser support. See also [Async scripts for asm.js](https://developer.mozilla.org/en-US/docs/Games/Techniques/Async_scripts)."
                    }
                },
                {
                    "name": "defer",
                    "valueSet": "v",
                    "description": {
                        "kind": "markdown",
                        "value": "This Boolean attribute is set to indicate to a browser that the script is meant to be executed after the document has been parsed, but before firing [`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded \"/en-US/docs/Web/Events/DOMContentLoaded\").\n\nScripts with the `defer` attribute will prevent the `DOMContentLoaded` event from firing until the script has loaded and finished evaluating.\n\nThis attribute must not be used if the `src` attribute is absent (i.e. for inline scripts), in this case it would have no effect.\n\nTo achieve a similar effect for dynamically inserted scripts use `async=\"false\"` instead. Scripts with the `defer` attribute will execute in the order in which they appear in the document."
                    }
                },
                {
                    "name": "crossorigin",
                    "valueSet": "xo",
                    "description": {
                        "kind": "markdown",
                        "value": "Normal `script` elements pass minimal information to the [`window.onerror`](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror \"The onerror property of the GlobalEventHandlers mixin is an EventHandler that processes error events.\") for scripts which do not pass the standard [CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS \"CORS: CORS (Cross-Origin Resource Sharing) is a system, consisting of transmitting HTTP headers, that determines whether browsers block frontend JavaScript code from accessing responses for cross-origin requests.\") checks. To allow error logging for sites which use a separate domain for static media, use this attribute. See [CORS settings attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for a more descriptive explanation of its valid arguments."
                    }
                },
                {
                    "name": "nonce",
                    "description": {
                        "kind": "markdown",
                        "value": "A cryptographic nonce (number used once) to whitelist inline scripts in a [script-src Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src). The server must generate a unique nonce value each time it transmits a policy. It is critical to provide a nonce that cannot be guessed as bypassing a resource's policy is otherwise trivial."
                    }
                },
                {
                    "name": "integrity",
                    "description": "This attribute contains inline metadata that a user agent can use to verify that a fetched resource has been delivered free of unexpected manipulation. See [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)."
                },
                {
                    "name": "nomodule",
                    "description": "This Boolean attribute is set to indicate that the script should not be executed in browsers that support [ES2015 modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/) — in effect, this can be used to serve fallback scripts to older browsers that do not support modular JavaScript code."
                },
                {
                    "name": "referrerpolicy",
                    "description": "Indicates which [referrer](https://developer.mozilla.org/en-US/docs/Web/API/Document/referrer) to send when fetching the script, or resources fetched by the script:\n\n*   `no-referrer`: The [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer \"The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.\") header will not be sent.\n*   `no-referrer-when-downgrade` (default): The [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer \"The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.\") header will not be sent to [origin](https://developer.mozilla.org/en-US/docs/Glossary/origin \"origin: Web content's origin is defined by the scheme (protocol), host (domain), and port of the URL used to access it. Two objects have the same origin only when the scheme, host, and port all match.\")s without [TLS](https://developer.mozilla.org/en-US/docs/Glossary/TLS \"TLS: Transport Layer Security (TLS), previously known as Secure Sockets Layer (SSL), is a protocol used by applications to communicate securely across a network, preventing tampering with and eavesdropping on email, web browsing, messaging, and other protocols.\") ([HTTPS](https://developer.mozilla.org/en-US/docs/Glossary/HTTPS \"HTTPS: HTTPS (HTTP Secure) is an encrypted version of the HTTP protocol. It usually uses SSL or TLS to encrypt all communication between a client and a server. This secure connection allows clients to safely exchange sensitive data with a server, for example for banking activities or online shopping.\")).\n*   `origin`: The sent referrer will be limited to the origin of the referring page: its [scheme](https://developer.mozilla.org/en-US/docs/Archive/Mozilla/URIScheme), [host](https://developer.mozilla.org/en-US/docs/Glossary/host \"host: A host is a device connected to the Internet (or a local network). Some hosts called servers offer additional services like serving webpages or storing files and emails.\"), and [port](https://developer.mozilla.org/en-US/docs/Glossary/port \"port: For a computer connected to a network with an IP address, a port is a communication endpoint. Ports are designated by numbers, and below 1024 each port is associated by default with a specific protocol.\").\n*   `origin-when-cross-origin`: The referrer sent to other origins will be limited to the scheme, the host, and the port. Navigations on the same origin will still include the path.\n*   `same-origin`: A referrer will be sent for [same origin](https://developer.mozilla.org/en-US/docs/Glossary/Same-origin_policy \"same origin: The same-origin policy is a critical security mechanism that restricts how a document or script loaded from one origin can interact with a resource from another origin.\"), but cross-origin requests will contain no referrer information.\n*   `strict-origin`: Only send the origin of the document as the referrer when the protocol security level stays the same (e.g. HTTPS→HTTPS), but don't send it to a less secure destination (e.g. HTTPS→HTTP).\n*   `strict-origin-when-cross-origin`: Send a full URL when performing a same-origin request, but only send the origin when the protocol security level stays the same (e.g.HTTPS→HTTPS), and send no header to a less secure destination (e.g. HTTPS→HTTP).\n*   `unsafe-url`: The referrer will include the origin _and_ the path (but not the [fragment](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/hash), [password](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/password), or [username](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/username)). **This value is unsafe**, because it leaks origins and paths from TLS-protected resources to insecure origins.\n\n**Note**: An empty string value (`\"\"`) is both the default value, and a fallback value if `referrerpolicy` is not supported. If `referrerpolicy` is not explicitly specified on the `<script>` element, it will adopt a higher-level referrer policy, i.e. one set on the whole document or domain. If a higher-level policy is not available, the empty string is treated as being equivalent to `no-referrer-when-downgrade`."
                },
                {
                    "name": "text",
                    "description": "Like the `textContent` attribute, this attribute sets the text content of the element. Unlike the `textContent` attribute, however, this attribute is evaluated as executable code after the node is inserted into the DOM."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/script"
                }
            ]
        },
        {
            "name": "noscript",
            "description": {
                "kind": "markdown",
                "value": "The noscript element represents nothing if scripting is enabled, and represents its children if scripting is disabled. It is used to present different markup to user agents that support scripting and those that don't support scripting, by affecting how the document is parsed."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/noscript"
                }
            ]
        },
        {
            "name": "template",
            "description": {
                "kind": "markdown",
                "value": "The template element is used to declare fragments of HTML that can be cloned and inserted in the document by script."
            },
            "attributes": [],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/template"
                }
            ]
        },
        {
            "name": "canvas",
            "description": {
                "kind": "markdown",
                "value": "The canvas element provides scripts with a resolution-dependent bitmap canvas, which can be used for rendering graphs, game graphics, art, or other visual images on the fly."
            },
            "attributes": [
                {
                    "name": "width",
                    "description": {
                        "kind": "markdown",
                        "value": "The width of the coordinate space in CSS pixels. Defaults to 300."
                    }
                },
                {
                    "name": "height",
                    "description": {
                        "kind": "markdown",
                        "value": "The height of the coordinate space in CSS pixels. Defaults to 150."
                    }
                },
                {
                    "name": "moz-opaque",
                    "description": "Lets the canvas know whether or not translucency will be a factor. If the canvas knows there's no translucency, painting performance can be optimized. This is only supported by Mozilla-based browsers; use the standardized [`canvas.getContext('2d', { alpha: false })`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext \"The HTMLCanvasElement.getContext() method returns a drawing context on the canvas, or null if the context identifier is not supported.\") instead."
                }
            ],
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Element/canvas"
                }
            ]
        }
    ],
    "globalAttributes": [
        {
            "name": "accesskey",
            "description": {
                "kind": "markdown",
                "value": "Provides a hint for generating a keyboard shortcut for the current element. This attribute consists of a space-separated list of characters. The browser should use the first one that exists on the computer keyboard layout."
            },
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/accesskey"
                }
            ]
        },
        {
            "name": "autocapitalize",
            "description": {
                "kind": "markdown",
                "value": "Controls whether and how text input is automatically capitalized as it is entered/edited by the user. It can have the following values:\n\n*   `off` or `none`, no autocapitalization is applied (all letters default to lowercase)\n*   `on` or `sentences`, the first letter of each sentence defaults to a capital letter; all other letters default to lowercase\n*   `words`, the first letter of each word defaults to a capital letter; all other letters default to lowercase\n*   `characters`, all letters should default to uppercase"
            },
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/autocapitalize"
                }
            ]
        },
        {
            "name": "class",
            "description": {
                "kind": "markdown",
                "value": "A space-separated list of the classes of the element. Classes allows CSS and JavaScript to select and access specific elements via the [class selectors](/en-US/docs/Web/CSS/Class_selectors) or functions like the method [`Document.getElementsByClassName()`](/en-US/docs/Web/API/Document/getElementsByClassName \"returns an array-like object of all child elements which have all of the given class names.\")."
            },
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/class"
                }
            ]
        },
        {
            "name": "contenteditable",
            "description": {
                "kind": "markdown",
                "value": "An enumerated attribute indicating if the element should be editable by the user. If so, the browser modifies its widget to allow editing. The attribute must take one of the following values:\n\n*   `true` or the _empty string_, which indicates that the element must be editable;\n*   `false`, which indicates that the element must not be editable."
            },
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/contenteditable"
                }
            ]
        },
        {
            "name": "contextmenu",
            "description": {
                "kind": "markdown",
                "value": "The `[**id**](#attr-id)` of a [`<menu>`](/en-US/docs/Web/HTML/Element/menu \"The HTML <menu> element represents a group of commands that a user can perform or activate. This includes both list menus, which might appear across the top of a screen, as well as context menus, such as those that might appear underneath a button after it has been clicked.\") to use as the contextual menu for this element."
            },
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/contextmenu"
                }
            ]
        },
        {
            "name": "dir",
            "description": {
                "kind": "markdown",
                "value": "An enumerated attribute indicating the directionality of the element's text. It can have the following values:\n\n*   `ltr`, which means _left to right_ and is to be used for languages that are written from the left to the right (like English);\n*   `rtl`, which means _right to left_ and is to be used for languages that are written from the right to the left (like Arabic);\n*   `auto`, which lets the user agent decide. It uses a basic algorithm as it parses the characters inside the element until it finds a character with a strong directionality, then it applies that directionality to the whole element."
            },
            "valueSet": "d",
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/dir"
                }
            ]
        },
        {
            "name": "draggable",
            "description": {
                "kind": "markdown",
                "value": "An enumerated attribute indicating whether the element can be dragged, using the [Drag and Drop API](/en-us/docs/DragDrop/Drag_and_Drop). It can have the following values:\n\n*   `true`, which indicates that the element may be dragged\n*   `false`, which indicates that the element may not be dragged."
            },
            "valueSet": "b",
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/draggable"
                }
            ]
        },
        {
            "name": "dropzone",
            "description": {
                "kind": "markdown",
                "value": "An enumerated attribute indicating what types of content can be dropped on an element, using the [Drag and Drop API](/en-US/docs/DragDrop/Drag_and_Drop). It can have the following values:\n\n*   `copy`, which indicates that dropping will create a copy of the element that was dragged\n*   `move`, which indicates that the element that was dragged will be moved to this new location.\n*   `link`, will create a link to the dragged data."
            }
        },
        {
            "name": "exportparts",
            "description": {
                "kind": "markdown",
                "value": "Used to transitively export shadow parts from a nested shadow tree into a containing light tree."
            },
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/exportparts"
                }
            ]
        },
        {
            "name": "hidden",
            "description": {
                "kind": "markdown",
                "value": "A Boolean attribute indicates that the element is not yet, or is no longer, _relevant_. For example, it can be used to hide elements of the page that can't be used until the login process has been completed. The browser won't render such elements. This attribute must not be used to hide content that could legitimately be shown."
            },
            "valueSet": "v",
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/hidden"
                }
            ]
        },
        {
            "name": "id",
            "description": {
                "kind": "markdown",
                "value": "Defines a unique identifier (ID) which must be unique in the whole document. Its purpose is to identify the element when linking (using a fragment identifier), scripting, or styling (with CSS)."
            },
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/id"
                }
            ]
        },
        {
            "name": "inputmode",
            "description": {
                "kind": "markdown",
                "value": "Provides a hint to browsers as to the type of virtual keyboard configuration to use when editing this element or its contents. Used primarily on [`<input>`](/en-US/docs/Web/HTML/Element/input \"The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.\") elements, but is usable on any element while in `[contenteditable](/en-US/docs/Web/HTML/Global_attributes#attr-contenteditable)` mode."
            },
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/inputmode"
                }
            ]
        },
        {
            "name": "is",
            "description": {
                "kind": "markdown",
                "value": "Allows you to specify that a standard HTML element should behave like a registered custom built-in element (see [Using custom elements](/en-US/docs/Web/Web_Components/Using_custom_elements) for more details)."
            },
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/is"
                }
            ]
        },
        {
            "name": "itemid",
            "description": {
                "kind": "markdown",
                "value": "The unique, global identifier of an item."
            },
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemid"
                }
            ]
        },
        {
            "name": "itemprop",
            "description": {
                "kind": "markdown",
                "value": "Used to add properties to an item. Every HTML element may have an `itemprop` attribute specified, where an `itemprop` consists of a name and value pair."
            },
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemprop"
                }
            ]
        },
        {
            "name": "itemref",
            "description": {
                "kind": "markdown",
                "value": "Properties that are not descendants of an element with the `itemscope` attribute can be associated with the item using an `itemref`. It provides a list of element ids (not `itemid`s) with additional properties elsewhere in the document."
            },
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemref"
                }
            ]
        },
        {
            "name": "itemscope",
            "description": {
                "kind": "markdown",
                "value": "`itemscope` (usually) works along with `[itemtype](/en-US/docs/Web/HTML/Global_attributes#attr-itemtype)` to specify that the HTML contained in a block is about a particular item. `itemscope` creates the Item and defines the scope of the `itemtype` associated with it. `itemtype` is a valid URL of a vocabulary (such as [schema.org](https://schema.org/)) that describes the item and its properties context."
            },
            "valueSet": "v",
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemscope"
                }
            ]
        },
        {
            "name": "itemtype",
            "description": {
                "kind": "markdown",
                "value": "Specifies the URL of the vocabulary that will be used to define `itemprop`s (item properties) in the data structure. `[itemscope](/en-US/docs/Web/HTML/Global_attributes#attr-itemscope)` is used to set the scope of where in the data structure the vocabulary set by `itemtype` will be active."
            },
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemtype"
                }
            ]
        },
        {
            "name": "lang",
            "description": {
                "kind": "markdown",
                "value": "Helps define the language of an element: the language that non-editable elements are in, or the language that editable elements should be written in by the user. The attribute contains one “language tag” (made of hyphen-separated “language subtags”) in the format defined in [_Tags for Identifying Languages (BCP47)_](https://www.ietf.org/rfc/bcp/bcp47.txt). [**xml:lang**](#attr-xml:lang) has priority over it."
            },
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/lang"
                }
            ]
        },
        {
            "name": "part",
            "description": {
                "kind": "markdown",
                "value": "A space-separated list of the part names of the element. Part names allows CSS to select and style specific elements in a shadow tree via the [`::part`](/en-US/docs/Web/CSS/::part \"The ::part CSS pseudo-element represents any element within a shadow tree that has a matching part attribute.\") pseudo-element."
            },
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/part"
                }
            ]
        },
        {
            "name": "role",
            "valueSet": "roles"
        },
        {
            "name": "slot",
            "description": {
                "kind": "markdown",
                "value": "Assigns a slot in a [shadow DOM](/en-US/docs/Web/Web_Components/Shadow_DOM) shadow tree to an element: An element with a `slot` attribute is assigned to the slot created by the [`<slot>`](/en-US/docs/Web/HTML/Element/slot \"The HTML <slot> element—part of the Web Components technology suite—is a placeholder inside a web component that you can fill with your own markup, which lets you create separate DOM trees and present them together.\") element whose `[name](/en-US/docs/Web/HTML/Element/slot#attr-name)` attribute's value matches that `slot` attribute's value."
            },
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/slot"
                }
            ]
        },
        {
            "name": "spellcheck",
            "description": {
                "kind": "markdown",
                "value": "An enumerated attribute defines whether the element may be checked for spelling errors. It may have the following values:\n\n*   `true`, which indicates that the element should be, if possible, checked for spelling errors;\n*   `false`, which indicates that the element should not be checked for spelling errors."
            },
            "valueSet": "b",
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/spellcheck"
                }
            ]
        },
        {
            "name": "style",
            "description": {
                "kind": "markdown",
                "value": "Contains [CSS](/en-US/docs/Web/CSS) styling declarations to be applied to the element. Note that it is recommended for styles to be defined in a separate file or files. This attribute and the [`<style>`](/en-US/docs/Web/HTML/Element/style \"The HTML <style> element contains style information for a document, or part of a document.\") element have mainly the purpose of allowing for quick styling, for example for testing purposes."
            },
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/style"
                }
            ]
        },
        {
            "name": "tabindex",
            "description": {
                "kind": "markdown",
                "value": "An integer attribute indicating if the element can take input focus (is _focusable_), if it should participate to sequential keyboard navigation, and if so, at what position. It can take several values:\n\n*   a _negative value_ means that the element should be focusable, but should not be reachable via sequential keyboard navigation;\n*   `0` means that the element should be focusable and reachable via sequential keyboard navigation, but its relative order is defined by the platform convention;\n*   a _positive value_ means that the element should be focusable and reachable via sequential keyboard navigation; the order in which the elements are focused is the increasing value of the [**tabindex**](#attr-tabindex). If several elements share the same tabindex, their relative order follows their relative positions in the document."
            },
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/tabindex"
                }
            ]
        },
        {
            "name": "title",
            "description": {
                "kind": "markdown",
                "value": "Contains a text representing advisory information related to the element it belongs to. Such information can typically, but not necessarily, be presented to the user as a tooltip."
            },
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/title"
                }
            ]
        },
        {
            "name": "translate",
            "description": {
                "kind": "markdown",
                "value": "An enumerated attribute that is used to specify whether an element's attribute values and the values of its [`Text`](/en-US/docs/Web/API/Text \"The Text interface represents the textual content of Element or Attr. If an element has no markup within its content, it has a single child implementing Text that contains the element's text. However, if the element contains markup, it is parsed into information items and Text nodes that form its children.\") node children are to be translated when the page is localized, or whether to leave them unchanged. It can have the following values:\n\n*   empty string and `yes`, which indicates that the element will be translated.\n*   `no`, which indicates that the element will not be translated."
            },
            "valueSet": "y",
            "references": [
                {
                    "name": "MDN Reference",
                    "url": "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/translate"
                }
            ]
        },
        {
            "name": "onabort",
            "description": {
                "kind": "markdown",
                "value": "The loading of a resource has been aborted."
            }
        },
        {
            "name": "onblur",
            "description": {
                "kind": "markdown",
                "value": "An element has lost focus (does not bubble)."
            }
        },
        {
            "name": "oncanplay",
            "description": {
                "kind": "markdown",
                "value": "The user agent can play the media, but estimates that not enough data has been loaded to play the media up to its end without having to stop for further buffering of content."
            }
        },
        {
            "name": "oncanplaythrough",
            "description": {
                "kind": "markdown",
                "value": "The user agent can play the media up to its end without having to stop for further buffering of content."
            }
        },
        {
            "name": "onchange",
            "description": {
                "kind": "markdown",
                "value": "The change event is fired for <input>, <select>, and <textarea> elements when a change to the element's value is committed by the user."
            }
        },
        {
            "name": "onclick",
            "description": {
                "kind": "markdown",
                "value": "A pointing device button has been pressed and released on an element."
            }
        },
        {
            "name": "oncontextmenu",
            "description": {
                "kind": "markdown",
                "value": "The right button of the mouse is clicked (before the context menu is displayed)."
            }
        },
        {
            "name": "ondblclick",
            "description": {
                "kind": "markdown",
                "value": "A pointing device button is clicked twice on an element."
            }
        },
        {
            "name": "ondrag",
            "description": {
                "kind": "markdown",
                "value": "An element or text selection is being dragged (every 350ms)."
            }
        },
        {
            "name": "ondragend",
            "description": {
                "kind": "markdown",
                "value": "A drag operation is being ended (by releasing a mouse button or hitting the escape key)."
            }
        },
        {
            "name": "ondragenter",
            "description": {
                "kind": "markdown",
                "value": "A dragged element or text selection enters a valid drop target."
            }
        },
        {
            "name": "ondragleave",
            "description": {
                "kind": "markdown",
                "value": "A dragged element or text selection leaves a valid drop target."
            }
        },
        {
            "name": "ondragover",
            "description": {
                "kind": "markdown",
                "value": "An element or text selection is being dragged over a valid drop target (every 350ms)."
            }
        },
        {
            "name": "ondragstart",
            "description": {
                "kind": "markdown",
                "value": "The user starts dragging an element or text selection."
            }
        },
        {
            "name": "ondrop",
            "description": {
                "kind": "markdown",
                "value": "An element is dropped on a valid drop target."
            }
        },
        {
            "name": "ondurationchange",
            "description": {
                "kind": "markdown",
                "value": "The duration attribute has been updated."
            }
        },
        {
            "name": "onemptied",
            "description": {
                "kind": "markdown",
                "value": "The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the load() method is called to reload it."
            }
        },
        {
            "name": "onended",
            "description": {
                "kind": "markdown",
                "value": "Playback has stopped because the end of the media was reached."
            }
        },
        {
            "name": "onerror",
            "description": {
                "kind": "markdown",
                "value": "A resource failed to load."
            }
        },
        {
            "name": "onfocus",
            "description": {
                "kind": "markdown",
                "value": "An element has received focus (does not bubble)."
            }
        },
        {
            "name": "onformchange"
        },
        {
            "name": "onforminput"
        },
        {
            "name": "oninput",
            "description": {
                "kind": "markdown",
                "value": "The value of an element changes or the content of an element with the attribute contenteditable is modified."
            }
        },
        {
            "name": "oninvalid",
            "description": {
                "kind": "markdown",
                "value": "A submittable element has been checked and doesn't satisfy its constraints."
            }
        },
        {
            "name": "onkeydown",
            "description": {
                "kind": "markdown",
                "value": "A key is pressed down."
            }
        },
        {
            "name": "onkeypress",
            "description": {
                "kind": "markdown",
                "value": "A key is pressed down and that key normally produces a character value (use input instead)."
            }
        },
        {
            "name": "onkeyup",
            "description": {
                "kind": "markdown",
                "value": "A key is released."
            }
        },
        {
            "name": "onload",
            "description": {
                "kind": "markdown",
                "value": "A resource and its dependent resources have finished loading."
            }
        },
        {
            "name": "onloadeddata",
            "description": {
                "kind": "markdown",
                "value": "The first frame of the media has finished loading."
            }
        },
        {
            "name": "onloadedmetadata",
            "description": {
                "kind": "markdown",
                "value": "The metadata has been loaded."
            }
        },
        {
            "name": "onloadstart",
            "description": {
                "kind": "markdown",
                "value": "Progress has begun."
            }
        },
        {
            "name": "onmousedown",
            "description": {
                "kind": "markdown",
                "value": "A pointing device button (usually a mouse) is pressed on an element."
            }
        },
        {
            "name": "onmousemove",
            "description": {
                "kind": "markdown",
                "value": "A pointing device is moved over an element."
            }
        },
        {
            "name": "onmouseout",
            "description": {
                "kind": "markdown",
                "value": "A pointing device is moved off the element that has the listener attached or off one of its children."
            }
        },
        {
            "name": "onmouseover",
            "description": {
                "kind": "markdown",
                "value": "A pointing device is moved onto the element that has the listener attached or onto one of its children."
            }
        },
        {
            "name": "onmouseup",
            "description": {
                "kind": "markdown",
                "value": "A pointing device button is released over an element."
            }
        },
        {
            "name": "onmousewheel"
        },
        {
            "name": "onmouseenter",
            "description": {
                "kind": "markdown",
                "value": "A pointing device is moved onto the element that has the listener attached."
            }
        },
        {
            "name": "onmouseleave",
            "description": {
                "kind": "markdown",
                "value": "A pointing device is moved off the element that has the listener attached."
            }
        },
        {
            "name": "onpause",
            "description": {
                "kind": "markdown",
                "value": "Playback has been paused."
            }
        },
        {
            "name": "onplay",
            "description": {
                "kind": "markdown",
                "value": "Playback has begun."
            }
        },
        {
            "name": "onplaying",
            "description": {
                "kind": "markdown",
                "value": "Playback is ready to start after having been paused or delayed due to lack of data."
            }
        },
        {
            "name": "onprogress",
            "description": {
                "kind": "markdown",
                "value": "In progress."
            }
        },
        {
            "name": "onratechange",
            "description": {
                "kind": "markdown",
                "value": "The playback rate has changed."
            }
        },
        {
            "name": "onreset",
            "description": {
                "kind": "markdown",
                "value": "A form is reset."
            }
        },
        {
            "name": "onresize",
            "description": {
                "kind": "markdown",
                "value": "The document view has been resized."
            }
        },
        {
            "name": "onreadystatechange",
            "description": {
                "kind": "markdown",
                "value": "The readyState attribute of a document has changed."
            }
        },
        {
            "name": "onscroll",
            "description": {
                "kind": "markdown",
                "value": "The document view or an element has been scrolled."
            }
        },
        {
            "name": "onseeked",
            "description": {
                "kind": "markdown",
                "value": "A seek operation completed."
            }
        },
        {
            "name": "onseeking",
            "description": {
                "kind": "markdown",
                "value": "A seek operation began."
            }
        },
        {
            "name": "onselect",
            "description": {
                "kind": "markdown",
                "value": "Some text is being selected."
            }
        },
        {
            "name": "onshow",
            "description": {
                "kind": "markdown",
                "value": "A contextmenu event was fired on/bubbled to an element that has a contextmenu attribute"
            }
        },
        {
            "name": "onstalled",
            "description": {
                "kind": "markdown",
                "value": "The user agent is trying to fetch media data, but data is unexpectedly not forthcoming."
            }
        },
        {
            "name": "onsubmit",
            "description": {
                "kind": "markdown",
                "value": "A form is submitted."
            }
        },
        {
            "name": "onsuspend",
            "description": {
                "kind": "markdown",
                "value": "Media data loading has been suspended."
            }
        },
        {
            "name": "ontimeupdate",
            "description": {
                "kind": "markdown",
                "value": "The time indicated by the currentTime attribute has been updated."
            }
        },
        {
            "name": "onvolumechange",
            "description": {
                "kind": "markdown",
                "value": "The volume has changed."
            }
        },
        {
            "name": "onwaiting",
            "description": {
                "kind": "markdown",
                "value": "Playback has stopped because of a temporary lack of data."
            }
        },
        {
            "name": "onpointercancel",
            "description": {
                "kind": "markdown",
                "value": "The pointer is unlikely to produce any more events."
            }
        },
        {
            "name": "onpointerdown",
            "description": {
                "kind": "markdown",
                "value": "The pointer enters the active buttons state."
            }
        },
        {
            "name": "onpointerenter",
            "description": {
                "kind": "markdown",
                "value": "Pointing device is moved inside the hit-testing boundary."
            }
        },
        {
            "name": "onpointerleave",
            "description": {
                "kind": "markdown",
                "value": "Pointing device is moved out of the hit-testing boundary."
            }
        },
        {
            "name": "onpointerlockchange",
            "description": {
                "kind": "markdown",
                "value": "The pointer was locked or released."
            }
        },
        {
            "name": "onpointerlockerror",
            "description": {
                "kind": "markdown",
                "value": "It was impossible to lock the pointer for technical reasons or because the permission was denied."
            }
        },
        {
            "name": "onpointermove",
            "description": {
                "kind": "markdown",
                "value": "The pointer changed coordinates."
            }
        },
        {
            "name": "onpointerout",
            "description": {
                "kind": "markdown",
                "value": "The pointing device moved out of hit-testing boundary or leaves detectable hover range."
            }
        },
        {
            "name": "onpointerover",
            "description": {
                "kind": "markdown",
                "value": "The pointing device is moved into the hit-testing boundary."
            }
        },
        {
            "name": "onpointerup",
            "description": {
                "kind": "markdown",
                "value": "The pointer leaves the active buttons state."
            }
        },
        {
            "name": "aria-activedescendant",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-activedescendant"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Identifies the currently active element when DOM focus is on a [`composite`](https://www.w3.org/TR/wai-aria-1.1/#composite) widget, [`textbox`](https://www.w3.org/TR/wai-aria-1.1/#textbox), [`group`](https://www.w3.org/TR/wai-aria-1.1/#group), or [`application`](https://www.w3.org/TR/wai-aria-1.1/#application)."
            }
        },
        {
            "name": "aria-atomic",
            "valueSet": "b",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-atomic"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Indicates whether [assistive technologies](https://www.w3.org/TR/wai-aria-1.1/#dfn-assistive-technology) will present all, or only parts of, the changed region based on the change notifications defined by the [`aria-relevant`](https://www.w3.org/TR/wai-aria-1.1/#aria-relevant) attribute."
            }
        },
        {
            "name": "aria-autocomplete",
            "valueSet": "autocomplete",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-autocomplete"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be presented if they are made."
            }
        },
        {
            "name": "aria-busy",
            "valueSet": "b",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-busy"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Indicates an element is being modified and that assistive technologies _MAY_ want to wait until the modifications are complete before exposing them to the user."
            }
        },
        {
            "name": "aria-checked",
            "valueSet": "tristate",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-checked"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Indicates the current \"checked\" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of checkboxes, radio buttons, and other [widgets](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-pressed`](https://www.w3.org/TR/wai-aria-1.1/#aria-pressed) and [`aria-selected`](https://www.w3.org/TR/wai-aria-1.1/#aria-selected)."
            }
        },
        {
            "name": "aria-colcount",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-colcount"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Defines the total number of columns in a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-colindex)."
            }
        },
        {
            "name": "aria-colindex",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-colindex"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Defines an [element's](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) column index or position with respect to the total number of columns within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colcount`](https://www.w3.org/TR/wai-aria-1.1/#aria-colcount) and [`aria-colspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-colspan)."
            }
        },
        {
            "name": "aria-colspan",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-colspan"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Defines the number of columns spanned by a cell or gridcell within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-colindex) and [`aria-rowspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan)."
            }
        },
        {
            "name": "aria-controls",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-controls"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) whose contents or presence are controlled by the current element. See related [`aria-owns`](https://www.w3.org/TR/wai-aria-1.1/#aria-owns)."
            }
        },
        {
            "name": "aria-current",
            "valueSet": "current",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-current"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Indicates the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that represents the current item within a container or set of related elements."
            }
        },
        {
            "name": "aria-describedat",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-describedat"
                }
            ]
        },
        {
            "name": "aria-describedby",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-describedby"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) that describes the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-labelledby`](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby)."
            }
        },
        {
            "name": "aria-disabled",
            "valueSet": "b",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-disabled"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Indicates that the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is [perceivable](https://www.w3.org/TR/wai-aria-1.1/#dfn-perceivable) but disabled, so it is not editable or otherwise [operable](https://www.w3.org/TR/wai-aria-1.1/#dfn-operable). See related [`aria-hidden`](https://www.w3.org/TR/wai-aria-1.1/#aria-hidden) and [`aria-readonly`](https://www.w3.org/TR/wai-aria-1.1/#aria-readonly)."
            }
        },
        {
            "name": "aria-dropeffect",
            "valueSet": "dropeffect",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-dropeffect"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "\\[Deprecated in ARIA 1.1\\] Indicates what functions can be performed when a dragged object is released on the drop target."
            }
        },
        {
            "name": "aria-errormessage",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that provides an error message for the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-invalid`](https://www.w3.org/TR/wai-aria-1.1/#aria-invalid) and [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby)."
            }
        },
        {
            "name": "aria-expanded",
            "valueSet": "u",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-expanded"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed."
            }
        },
        {
            "name": "aria-flowto",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-flowto"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Identifies the next [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) in an alternate reading order of content which, at the user's discretion, allows assistive technology to override the general default of reading in document source order."
            }
        },
        {
            "name": "aria-grabbed",
            "valueSet": "u",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-grabbed"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "\\[Deprecated in ARIA 1.1\\] Indicates an element's \"grabbed\" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) in a drag-and-drop operation."
            }
        },
        {
            "name": "aria-haspopup",
            "valueSet": "haspopup",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element)."
            }
        },
        {
            "name": "aria-hidden",
            "valueSet": "b",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-hidden"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Indicates whether the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is exposed to an accessibility API. See related [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.1/#aria-disabled)."
            }
        },
        {
            "name": "aria-invalid",
            "valueSet": "invalid",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-invalid"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Indicates the entered value does not conform to the format expected by the application. See related [`aria-errormessage`](https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage)."
            }
        },
        {
            "name": "aria-kbdshortcuts",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-kbdshortcuts"
                }
            ]
        },
        {
            "name": "aria-label",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-label"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Defines a string value that labels the current element. See related [`aria-labelledby`](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby)."
            }
        },
        {
            "name": "aria-labelledby",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) that labels the current element. See related [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby)."
            }
        },
        {
            "name": "aria-level",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-level"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Defines the hierarchical level of an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) within a structure."
            }
        },
        {
            "name": "aria-live",
            "valueSet": "live",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-live"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Indicates that an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) will be updated, and describes the types of updates the [user agents](https://www.w3.org/TR/wai-aria-1.1/#dfn-user-agent), [assistive technologies](https://www.w3.org/TR/wai-aria-1.1/#dfn-assistive-technology), and user can expect from the [live region](https://www.w3.org/TR/wai-aria-1.1/#dfn-live-region)."
            }
        },
        {
            "name": "aria-modal",
            "valueSet": "b",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-modal"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Indicates whether an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is modal when displayed."
            }
        },
        {
            "name": "aria-multiline",
            "valueSet": "b",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-multiline"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Indicates whether a text box accepts multiple lines of input or only a single line."
            }
        },
        {
            "name": "aria-multiselectable",
            "valueSet": "b",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-multiselectable"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Indicates that the user may select more than one item from the current selectable descendants."
            }
        },
        {
            "name": "aria-orientation",
            "valueSet": "orientation",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-orientation"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous."
            }
        },
        {
            "name": "aria-owns",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-owns"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Identifies an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) in order to define a visual, functional, or contextual parent/child [relationship](https://www.w3.org/TR/wai-aria-1.1/#dfn-relationship) between DOM elements where the DOM hierarchy cannot be used to represent the relationship. See related [`aria-controls`](https://www.w3.org/TR/wai-aria-1.1/#aria-controls)."
            }
        },
        {
            "name": "aria-placeholder",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value. A hint could be a sample value or a brief description of the expected format."
            }
        },
        {
            "name": "aria-posinset",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-posinset"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Defines an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element)'s number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. See related [`aria-setsize`](https://www.w3.org/TR/wai-aria-1.1/#aria-setsize)."
            }
        },
        {
            "name": "aria-pressed",
            "valueSet": "tristate",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-pressed"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Indicates the current \"pressed\" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of toggle buttons. See related [`aria-checked`](https://www.w3.org/TR/wai-aria-1.1/#aria-checked) and [`aria-selected`](https://www.w3.org/TR/wai-aria-1.1/#aria-selected)."
            }
        },
        {
            "name": "aria-readonly",
            "valueSet": "b",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-readonly"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Indicates that the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is not editable, but is otherwise [operable](https://www.w3.org/TR/wai-aria-1.1/#dfn-operable). See related [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.1/#aria-disabled)."
            }
        },
        {
            "name": "aria-relevant",
            "valueSet": "relevant",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-relevant"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified. See related [`aria-atomic`](https://www.w3.org/TR/wai-aria-1.1/#aria-atomic)."
            }
        },
        {
            "name": "aria-required",
            "valueSet": "b",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-required"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Indicates that user input is required on the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) before a form may be submitted."
            }
        },
        {
            "name": "aria-roledescription",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-roledescription"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Defines a human-readable, author-localized description for the [role](https://www.w3.org/TR/wai-aria-1.1/#dfn-role) of an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element)."
            }
        },
        {
            "name": "aria-rowcount",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Defines the total number of rows in a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex)."
            }
        },
        {
            "name": "aria-rowindex",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Defines an [element's](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) row index or position with respect to the total number of rows within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowcount`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount) and [`aria-rowspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan)."
            }
        },
        {
            "name": "aria-rowspan",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Defines the number of rows spanned by a cell or gridcell within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex) and [`aria-colspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-colspan)."
            }
        },
        {
            "name": "aria-selected",
            "valueSet": "u",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-selected"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Indicates the current \"selected\" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of various [widgets](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-checked`](https://www.w3.org/TR/wai-aria-1.1/#aria-checked) and [`aria-pressed`](https://www.w3.org/TR/wai-aria-1.1/#aria-pressed)."
            }
        },
        {
            "name": "aria-setsize",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-setsize"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. See related [`aria-posinset`](https://www.w3.org/TR/wai-aria-1.1/#aria-posinset)."
            }
        },
        {
            "name": "aria-sort",
            "valueSet": "sort",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-sort"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Indicates if items in a table or grid are sorted in ascending or descending order."
            }
        },
        {
            "name": "aria-valuemax",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Defines the maximum allowed value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget)."
            }
        },
        {
            "name": "aria-valuemin",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Defines the minimum allowed value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget)."
            }
        },
        {
            "name": "aria-valuenow",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Defines the current value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-valuetext`](https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext)."
            }
        },
        {
            "name": "aria-valuetext",
            "references": [
                {
                    "name": "WAI-ARIA Reference",
                    "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext"
                }
            ],
            "description": {
                "kind": "markdown",
                "value": "Defines the human readable text alternative of [`aria-valuenow`](https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow) for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget)."
            }
        },
        {
            "name": "aria-details",
            "description": {
                "kind": "markdown",
                "value": "Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that provides a detailed, extended description for the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby)."
            }
        },
        {
            "name": "aria-keyshortcuts",
            "description": {
                "kind": "markdown",
                "value": "Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element."
            }
        }
    ],
    "valueSets": [
        {
            "name": "b",
            "values": [
                {
                    "name": "true"
                },
                {
                    "name": "false"
                }
            ]
        },
        {
            "name": "u",
            "values": [
                {
                    "name": "true"
                },
                {
                    "name": "false"
                },
                {
                    "name": "undefined"
                }
            ]
        },
        {
            "name": "o",
            "values": [
                {
                    "name": "on"
                },
                {
                    "name": "off"
                }
            ]
        },
        {
            "name": "y",
            "values": [
                {
                    "name": "yes"
                },
                {
                    "name": "no"
                }
            ]
        },
        {
            "name": "w",
            "values": [
                {
                    "name": "soft"
                },
                {
                    "name": "hard"
                }
            ]
        },
        {
            "name": "d",
            "values": [
                {
                    "name": "ltr"
                },
                {
                    "name": "rtl"
                },
                {
                    "name": "auto"
                }
            ]
        },
        {
            "name": "m",
            "values": [
                {
                    "name": "get",
                    "description": {
                        "kind": "markdown",
                        "value": "Corresponds to the HTTP [GET method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.3); form data are appended to the `action` attribute URI with a '?' as separator, and the resulting URI is sent to the server. Use this method when the form has no side-effects and contains only ASCII characters."
                    }
                },
                {
                    "name": "post",
                    "description": {
                        "kind": "markdown",
                        "value": "Corresponds to the HTTP [POST method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.5); form data are included in the body of the form and sent to the server."
                    }
                },
                {
                    "name": "dialog",
                    "description": {
                        "kind": "markdown",
                        "value": "Use when the form is inside a [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) element to close the dialog when submitted."
                    }
                }
            ]
        },
        {
            "name": "fm",
            "values": [
                {
                    "name": "get"
                },
                {
                    "name": "post"
                }
            ]
        },
        {
            "name": "s",
            "values": [
                {
                    "name": "row"
                },
                {
                    "name": "col"
                },
                {
                    "name": "rowgroup"
                },
                {
                    "name": "colgroup"
                }
            ]
        },
        {
            "name": "t",
            "values": [
                {
                    "name": "hidden"
                },
                {
                    "name": "text"
                },
                {
                    "name": "search"
                },
                {
                    "name": "tel"
                },
                {
                    "name": "url"
                },
                {
                    "name": "email"
                },
                {
                    "name": "password"
                },
                {
                    "name": "datetime"
                },
                {
                    "name": "date"
                },
                {
                    "name": "month"
                },
                {
                    "name": "week"
                },
                {
                    "name": "time"
                },
                {
                    "name": "datetime-local"
                },
                {
                    "name": "number"
                },
                {
                    "name": "range"
                },
                {
                    "name": "color"
                },
                {
                    "name": "checkbox"
                },
                {
                    "name": "radio"
                },
                {
                    "name": "file"
                },
                {
                    "name": "submit"
                },
                {
                    "name": "image"
                },
                {
                    "name": "reset"
                },
                {
                    "name": "button"
                }
            ]
        },
        {
            "name": "im",
            "values": [
                {
                    "name": "verbatim"
                },
                {
                    "name": "latin"
                },
                {
                    "name": "latin-name"
                },
                {
                    "name": "latin-prose"
                },
                {
                    "name": "full-width-latin"
                },
                {
                    "name": "kana"
                },
                {
                    "name": "kana-name"
                },
                {
                    "name": "katakana"
                },
                {
                    "name": "numeric"
                },
                {
                    "name": "tel"
                },
                {
                    "name": "email"
                },
                {
                    "name": "url"
                }
            ]
        },
        {
            "name": "bt",
            "values": [
                {
                    "name": "button"
                },
                {
                    "name": "submit"
                },
                {
                    "name": "reset"
                },
                {
                    "name": "menu"
                }
            ]
        },
        {
            "name": "lt",
            "values": [
                {
                    "name": "1"
                },
                {
                    "name": "a"
                },
                {
                    "name": "A"
                },
                {
                    "name": "i"
                },
                {
                    "name": "I"
                }
            ]
        },
        {
            "name": "mt",
            "values": [
                {
                    "name": "context"
                },
                {
                    "name": "toolbar"
                }
            ]
        },
        {
            "name": "mit",
            "values": [
                {
                    "name": "command"
                },
                {
                    "name": "checkbox"
                },
                {
                    "name": "radio"
                }
            ]
        },
        {
            "name": "et",
            "values": [
                {
                    "name": "application/x-www-form-urlencoded"
                },
                {
                    "name": "multipart/form-data"
                },
                {
                    "name": "text/plain"
                }
            ]
        },
        {
            "name": "tk",
            "values": [
                {
                    "name": "subtitles"
                },
                {
                    "name": "captions"
                },
                {
                    "name": "descriptions"
                },
                {
                    "name": "chapters"
                },
                {
                    "name": "metadata"
                }
            ]
        },
        {
            "name": "pl",
            "values": [
                {
                    "name": "none"
                },
                {
                    "name": "metadata"
                },
                {
                    "name": "auto"
                }
            ]
        },
        {
            "name": "sh",
            "values": [
                {
                    "name": "circle"
                },
                {
                    "name": "default"
                },
                {
                    "name": "poly"
                },
                {
                    "name": "rect"
                }
            ]
        },
        {
            "name": "xo",
            "values": [
                {
                    "name": "anonymous"
                },
                {
                    "name": "use-credentials"
                }
            ]
        },
        {
            "name": "sb",
            "values": [
                {
                    "name": "allow-forms"
                },
                {
                    "name": "allow-modals"
                },
                {
                    "name": "allow-pointer-lock"
                },
                {
                    "name": "allow-popups"
                },
                {
                    "name": "allow-popups-to-escape-sandbox"
                },
                {
                    "name": "allow-same-origin"
                },
                {
                    "name": "allow-scripts"
                },
                {
                    "name": "allow-top-navigation"
                }
            ]
        },
        {
            "name": "tristate",
            "values": [
                {
                    "name": "true"
                },
                {
                    "name": "false"
                },
                {
                    "name": "mixed"
                },
                {
                    "name": "undefined"
                }
            ]
        },
        {
            "name": "inputautocomplete",
            "values": [
                {
                    "name": "additional-name"
                },
                {
                    "name": "address-level1"
                },
                {
                    "name": "address-level2"
                },
                {
                    "name": "address-level3"
                },
                {
                    "name": "address-level4"
                },
                {
                    "name": "address-line1"
                },
                {
                    "name": "address-line2"
                },
                {
                    "name": "address-line3"
                },
                {
                    "name": "bday"
                },
                {
                    "name": "bday-year"
                },
                {
                    "name": "bday-day"
                },
                {
                    "name": "bday-month"
                },
                {
                    "name": "billing"
                },
                {
                    "name": "cc-additional-name"
                },
                {
                    "name": "cc-csc"
                },
                {
                    "name": "cc-exp"
                },
                {
                    "name": "cc-exp-month"
                },
                {
                    "name": "cc-exp-year"
                },
                {
                    "name": "cc-family-name"
                },
                {
                    "name": "cc-given-name"
                },
                {
                    "name": "cc-name"
                },
                {
                    "name": "cc-number"
                },
                {
                    "name": "cc-type"
                },
                {
                    "name": "country"
                },
                {
                    "name": "country-name"
                },
                {
                    "name": "current-password"
                },
                {
                    "name": "email"
                },
                {
                    "name": "family-name"
                },
                {
                    "name": "fax"
                },
                {
                    "name": "given-name"
                },
                {
                    "name": "home"
                },
                {
                    "name": "honorific-prefix"
                },
                {
                    "name": "honorific-suffix"
                },
                {
                    "name": "impp"
                },
                {
                    "name": "language"
                },
                {
                    "name": "mobile"
                },
                {
                    "name": "name"
                },
                {
                    "name": "new-password"
                },
                {
                    "name": "nickname"
                },
                {
                    "name": "organization"
                },
                {
                    "name": "organization-title"
                },
                {
                    "name": "pager"
                },
                {
                    "name": "photo"
                },
                {
                    "name": "postal-code"
                },
                {
                    "name": "sex"
                },
                {
                    "name": "shipping"
                },
                {
                    "name": "street-address"
                },
                {
                    "name": "tel-area-code"
                },
                {
                    "name": "tel"
                },
                {
                    "name": "tel-country-code"
                },
                {
                    "name": "tel-extension"
                },
                {
                    "name": "tel-local"
                },
                {
                    "name": "tel-local-prefix"
                },
                {
                    "name": "tel-local-suffix"
                },
                {
                    "name": "tel-national"
                },
                {
                    "name": "transaction-amount"
                },
                {
                    "name": "transaction-currency"
                },
                {
                    "name": "url"
                },
                {
                    "name": "username"
                },
                {
                    "name": "work"
                }
            ]
        },
        {
            "name": "autocomplete",
            "values": [
                {
                    "name": "inline"
                },
                {
                    "name": "list"
                },
                {
                    "name": "both"
                },
                {
                    "name": "none"
                }
            ]
        },
        {
            "name": "current",
            "values": [
                {
                    "name": "page"
                },
                {
                    "name": "step"
                },
                {
                    "name": "location"
                },
                {
                    "name": "date"
                },
                {
                    "name": "time"
                },
                {
                    "name": "true"
                },
                {
                    "name": "false"
                }
            ]
        },
        {
            "name": "dropeffect",
            "values": [
                {
                    "name": "copy"
                },
                {
                    "name": "move"
                },
                {
                    "name": "link"
                },
                {
                    "name": "execute"
                },
                {
                    "name": "popup"
                },
                {
                    "name": "none"
                }
            ]
        },
        {
            "name": "invalid",
            "values": [
                {
                    "name": "grammar"
                },
                {
                    "name": "false"
                },
                {
                    "name": "spelling"
                },
                {
                    "name": "true"
                }
            ]
        },
        {
            "name": "live",
            "values": [
                {
                    "name": "off"
                },
                {
                    "name": "polite"
                },
                {
                    "name": "assertive"
                }
            ]
        },
        {
            "name": "orientation",
            "values": [
                {
                    "name": "vertical"
                },
                {
                    "name": "horizontal"
                },
                {
                    "name": "undefined"
                }
            ]
        },
        {
            "name": "relevant",
            "values": [
                {
                    "name": "additions"
                },
                {
                    "name": "removals"
                },
                {
                    "name": "text"
                },
                {
                    "name": "all"
                },
                {
                    "name": "additions text"
                }
            ]
        },
        {
            "name": "sort",
            "values": [
                {
                    "name": "ascending"
                },
                {
                    "name": "descending"
                },
                {
                    "name": "none"
                },
                {
                    "name": "other"
                }
            ]
        },
        {
            "name": "roles",
            "values": [
                {
                    "name": "alert"
                },
                {
                    "name": "alertdialog"
                },
                {
                    "name": "button"
                },
                {
                    "name": "checkbox"
                },
                {
                    "name": "dialog"
                },
                {
                    "name": "gridcell"
                },
                {
                    "name": "link"
                },
                {
                    "name": "log"
                },
                {
                    "name": "marquee"
                },
                {
                    "name": "menuitem"
                },
                {
                    "name": "menuitemcheckbox"
                },
                {
                    "name": "menuitemradio"
                },
                {
                    "name": "option"
                },
                {
                    "name": "progressbar"
                },
                {
                    "name": "radio"
                },
                {
                    "name": "scrollbar"
                },
                {
                    "name": "searchbox"
                },
                {
                    "name": "slider"
                },
                {
                    "name": "spinbutton"
                },
                {
                    "name": "status"
                },
                {
                    "name": "switch"
                },
                {
                    "name": "tab"
                },
                {
                    "name": "tabpanel"
                },
                {
                    "name": "textbox"
                },
                {
                    "name": "timer"
                },
                {
                    "name": "tooltip"
                },
                {
                    "name": "treeitem"
                },
                {
                    "name": "combobox"
                },
                {
                    "name": "grid"
                },
                {
                    "name": "listbox"
                },
                {
                    "name": "menu"
                },
                {
                    "name": "menubar"
                },
                {
                    "name": "radiogroup"
                },
                {
                    "name": "tablist"
                },
                {
                    "name": "tree"
                },
                {
                    "name": "treegrid"
                },
                {
                    "name": "application"
                },
                {
                    "name": "article"
                },
                {
                    "name": "cell"
                },
                {
                    "name": "columnheader"
                },
                {
                    "name": "definition"
                },
                {
                    "name": "directory"
                },
                {
                    "name": "document"
                },
                {
                    "name": "feed"
                },
                {
                    "name": "figure"
                },
                {
                    "name": "group"
                },
                {
                    "name": "heading"
                },
                {
                    "name": "img"
                },
                {
                    "name": "list"
                },
                {
                    "name": "listitem"
                },
                {
                    "name": "math"
                },
                {
                    "name": "none"
                },
                {
                    "name": "note"
                },
                {
                    "name": "presentation"
                },
                {
                    "name": "region"
                },
                {
                    "name": "row"
                },
                {
                    "name": "rowgroup"
                },
                {
                    "name": "rowheader"
                },
                {
                    "name": "separator"
                },
                {
                    "name": "table"
                },
                {
                    "name": "term"
                },
                {
                    "name": "text"
                },
                {
                    "name": "toolbar"
                },
                {
                    "name": "banner"
                },
                {
                    "name": "complementary"
                },
                {
                    "name": "contentinfo"
                },
                {
                    "name": "form"
                },
                {
                    "name": "main"
                },
                {
                    "name": "navigation"
                },
                {
                    "name": "region"
                },
                {
                    "name": "search"
                },
                {
                    "name": "doc-abstract"
                },
                {
                    "name": "doc-acknowledgments"
                },
                {
                    "name": "doc-afterword"
                },
                {
                    "name": "doc-appendix"
                },
                {
                    "name": "doc-backlink"
                },
                {
                    "name": "doc-biblioentry"
                },
                {
                    "name": "doc-bibliography"
                },
                {
                    "name": "doc-biblioref"
                },
                {
                    "name": "doc-chapter"
                },
                {
                    "name": "doc-colophon"
                },
                {
                    "name": "doc-conclusion"
                },
                {
                    "name": "doc-cover"
                },
                {
                    "name": "doc-credit"
                },
                {
                    "name": "doc-credits"
                },
                {
                    "name": "doc-dedication"
                },
                {
                    "name": "doc-endnote"
                },
                {
                    "name": "doc-endnotes"
                },
                {
                    "name": "doc-epigraph"
                },
                {
                    "name": "doc-epilogue"
                },
                {
                    "name": "doc-errata"
                },
                {
                    "name": "doc-example"
                },
                {
                    "name": "doc-footnote"
                },
                {
                    "name": "doc-foreword"
                },
                {
                    "name": "doc-glossary"
                },
                {
                    "name": "doc-glossref"
                },
                {
                    "name": "doc-index"
                },
                {
                    "name": "doc-introduction"
                },
                {
                    "name": "doc-noteref"
                },
                {
                    "name": "doc-notice"
                },
                {
                    "name": "doc-pagebreak"
                },
                {
                    "name": "doc-pagelist"
                },
                {
                    "name": "doc-part"
                },
                {
                    "name": "doc-preface"
                },
                {
                    "name": "doc-prologue"
                },
                {
                    "name": "doc-pullquote"
                },
                {
                    "name": "doc-qna"
                },
                {
                    "name": "doc-subtitle"
                },
                {
                    "name": "doc-tip"
                },
                {
                    "name": "doc-toc"
                }
            ]
        },
        {
            "name": "metanames",
            "values": [
                {
                    "name": "application-name"
                },
                {
                    "name": "author"
                },
                {
                    "name": "description"
                },
                {
                    "name": "format-detection"
                },
                {
                    "name": "generator"
                },
                {
                    "name": "keywords"
                },
                {
                    "name": "publisher"
                },
                {
                    "name": "referrer"
                },
                {
                    "name": "robots"
                },
                {
                    "name": "theme-color"
                },
                {
                    "name": "viewport"
                }
            ]
        },
        {
            "name": "haspopup",
            "values": [
                {
                    "name": "false",
                    "description": {
                        "kind": "markdown",
                        "value": "(default) Indicates the element does not have a popup."
                    }
                },
                {
                    "name": "true",
                    "description": {
                        "kind": "markdown",
                        "value": "Indicates the popup is a menu."
                    }
                },
                {
                    "name": "menu",
                    "description": {
                        "kind": "markdown",
                        "value": "Indicates the popup is a menu."
                    }
                },
                {
                    "name": "listbox",
                    "description": {
                        "kind": "markdown",
                        "value": "Indicates the popup is a listbox."
                    }
                },
                {
                    "name": "tree",
                    "description": {
                        "kind": "markdown",
                        "value": "Indicates the popup is a tree."
                    }
                },
                {
                    "name": "grid",
                    "description": {
                        "kind": "markdown",
                        "value": "Indicates the popup is a grid."
                    }
                },
                {
                    "name": "dialog",
                    "description": {
                        "kind": "markdown",
                        "value": "Indicates the popup is a dialog."
                    }
                }
            ]
        }
    ]
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function getAugmentedNamespace(n) {
	if (n.__esModule) return n;
	var a = Object.defineProperty({}, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var ral = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
let _ral;
function RAL() {
    if (_ral === undefined) {
        throw new Error(`No runtime abstraction layer installed`);
    }
    return _ral;
}
(function (RAL) {
    function install(ral) {
        if (ral === undefined) {
            throw new Error(`No runtime abstraction layer provided`);
        }
        _ral = ral;
    }
    RAL.install = install;
})(RAL || (RAL = {}));
exports.default = RAL;

});

var disposable = createCommonjsModule(function (module, exports) {
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Disposable = void 0;
(function (Disposable) {
    function create(func) {
        return {
            dispose: func
        };
    }
    Disposable.create = create;
})(exports.Disposable || (exports.Disposable = {}));

});

var events = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emitter = exports.Event = void 0;
(function (Event) {
    const _disposable = { dispose() { } };
    Event.None = function () { return _disposable; };
})(exports.Event || (exports.Event = {}));
class CallbackList {
    add(callback, context = null, bucket) {
        if (!this._callbacks) {
            this._callbacks = [];
            this._contexts = [];
        }
        this._callbacks.push(callback);
        this._contexts.push(context);
        if (Array.isArray(bucket)) {
            bucket.push({ dispose: () => this.remove(callback, context) });
        }
    }
    remove(callback, context = null) {
        if (!this._callbacks) {
            return;
        }
        let foundCallbackWithDifferentContext = false;
        for (let i = 0, len = this._callbacks.length; i < len; i++) {
            if (this._callbacks[i] === callback) {
                if (this._contexts[i] === context) {
                    // callback & context match => remove it
                    this._callbacks.splice(i, 1);
                    this._contexts.splice(i, 1);
                    return;
                }
                else {
                    foundCallbackWithDifferentContext = true;
                }
            }
        }
        if (foundCallbackWithDifferentContext) {
            throw new Error('When adding a listener with a context, you should remove it with the same context');
        }
    }
    invoke(...args) {
        if (!this._callbacks) {
            return [];
        }
        const ret = [], callbacks = this._callbacks.slice(0), contexts = this._contexts.slice(0);
        for (let i = 0, len = callbacks.length; i < len; i++) {
            try {
                ret.push(callbacks[i].apply(contexts[i], args));
            }
            catch (e) {
                // eslint-disable-next-line no-console
                ral.default().console.error(e);
            }
        }
        return ret;
    }
    isEmpty() {
        return !this._callbacks || this._callbacks.length === 0;
    }
    dispose() {
        this._callbacks = undefined;
        this._contexts = undefined;
    }
}
class Emitter {
    constructor(_options) {
        this._options = _options;
    }
    /**
     * For the public to allow to subscribe
     * to events from this Emitter
     */
    get event() {
        if (!this._event) {
            this._event = (listener, thisArgs, disposables) => {
                if (!this._callbacks) {
                    this._callbacks = new CallbackList();
                }
                if (this._options && this._options.onFirstListenerAdd && this._callbacks.isEmpty()) {
                    this._options.onFirstListenerAdd(this);
                }
                this._callbacks.add(listener, thisArgs);
                const result = {
                    dispose: () => {
                        if (!this._callbacks) {
                            // disposable is disposed after emitter is disposed.
                            return;
                        }
                        this._callbacks.remove(listener, thisArgs);
                        result.dispose = Emitter._noop;
                        if (this._options && this._options.onLastListenerRemove && this._callbacks.isEmpty()) {
                            this._options.onLastListenerRemove(this);
                        }
                    }
                };
                if (Array.isArray(disposables)) {
                    disposables.push(result);
                }
                return result;
            };
        }
        return this._event;
    }
    /**
     * To be kept private to fire an event to
     * subscribers
     */
    fire(event) {
        if (this._callbacks) {
            this._callbacks.invoke.call(this._callbacks, event);
        }
    }
    dispose() {
        if (this._callbacks) {
            this._callbacks.dispose();
            this._callbacks = undefined;
        }
    }
}
exports.Emitter = Emitter;
Emitter._noop = function () { };

});

var messageBuffer = createCommonjsModule(function (module, exports) {
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractMessageBuffer = void 0;
const CR = 13;
const LF = 10;
const CRLF = '\r\n';
class AbstractMessageBuffer {
    constructor(encoding = 'utf-8') {
        this._encoding = encoding;
        this._chunks = [];
        this._totalLength = 0;
    }
    get encoding() {
        return this._encoding;
    }
    append(chunk) {
        const toAppend = typeof chunk === 'string' ? this.fromString(chunk, this._encoding) : chunk;
        this._chunks.push(toAppend);
        this._totalLength += toAppend.byteLength;
    }
    tryReadHeaders() {
        if (this._chunks.length === 0) {
            return undefined;
        }
        let state = 0;
        let chunkIndex = 0;
        let offset = 0;
        let chunkBytesRead = 0;
        row: while (chunkIndex < this._chunks.length) {
            const chunk = this._chunks[chunkIndex];
            offset = 0;
            while (offset < chunk.length) {
                const value = chunk[offset];
                switch (value) {
                    case CR:
                        switch (state) {
                            case 0:
                                state = 1;
                                break;
                            case 2:
                                state = 3;
                                break;
                            default:
                                state = 0;
                        }
                        break;
                    case LF:
                        switch (state) {
                            case 1:
                                state = 2;
                                break;
                            case 3:
                                state = 4;
                                offset++;
                                break row;
                            default:
                                state = 0;
                        }
                        break;
                    default:
                        state = 0;
                }
                offset++;
            }
            chunkBytesRead += chunk.byteLength;
            chunkIndex++;
        }
        if (state !== 4) {
            return undefined;
        }
        // The buffer contains the two CRLF at the end. So we will
        // have two empty lines after the split at the end as well.
        const buffer = this._read(chunkBytesRead + offset);
        const result = new Map();
        const headers = this.toString(buffer, 'ascii').split(CRLF);
        if (headers.length < 2) {
            return result;
        }
        for (let i = 0; i < headers.length - 2; i++) {
            const header = headers[i];
            const index = header.indexOf(':');
            if (index === -1) {
                throw new Error('Message header must separate key and value using :');
            }
            const key = header.substr(0, index);
            const value = header.substr(index + 1).trim();
            result.set(key, value);
        }
        return result;
    }
    tryReadBody(length) {
        if (this._totalLength < length) {
            return undefined;
        }
        return this._read(length);
    }
    get numberOfBytes() {
        return this._totalLength;
    }
    _read(byteCount) {
        if (byteCount === 0) {
            return this.emptyBuffer();
        }
        if (byteCount > this._totalLength) {
            throw new Error(`Cannot read so many bytes!`);
        }
        if (this._chunks[0].byteLength === byteCount) {
            // super fast path, precisely first chunk must be returned
            const chunk = this._chunks[0];
            this._chunks.shift();
            this._totalLength -= byteCount;
            return this.asNative(chunk);
        }
        if (this._chunks[0].byteLength > byteCount) {
            // fast path, the reading is entirely within the first chunk
            const chunk = this._chunks[0];
            const result = this.asNative(chunk, byteCount);
            this._chunks[0] = chunk.slice(byteCount);
            this._totalLength -= byteCount;
            return result;
        }
        const result = this.allocNative(byteCount);
        let resultOffset = 0;
        let chunkIndex = 0;
        while (byteCount > 0) {
            const chunk = this._chunks[chunkIndex];
            if (chunk.byteLength > byteCount) {
                // this chunk will survive
                const chunkPart = chunk.slice(0, byteCount);
                result.set(chunkPart, resultOffset);
                resultOffset += byteCount;
                this._chunks[chunkIndex] = chunk.slice(byteCount);
                this._totalLength -= byteCount;
                byteCount -= byteCount;
            }
            else {
                // this chunk will be entirely read
                result.set(chunk, resultOffset);
                resultOffset += chunk.byteLength;
                this._chunks.shift();
                this._totalLength -= chunk.byteLength;
                byteCount -= chunk.byteLength;
            }
        }
        return result;
    }
}
exports.AbstractMessageBuffer = AbstractMessageBuffer;

});

var ril = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });




class MessageBuffer extends messageBuffer.AbstractMessageBuffer {
    constructor(encoding = 'utf-8') {
        super(encoding);
        this.asciiDecoder = new TextDecoder('ascii');
    }
    emptyBuffer() {
        return MessageBuffer.emptyBuffer;
    }
    fromString(value, _encoding) {
        return (new TextEncoder()).encode(value);
    }
    toString(value, encoding) {
        if (encoding === 'ascii') {
            return this.asciiDecoder.decode(value);
        }
        else {
            return (new TextDecoder(encoding)).decode(value);
        }
    }
    asNative(buffer, length) {
        if (length === undefined) {
            return buffer;
        }
        else {
            return buffer.slice(0, length);
        }
    }
    allocNative(length) {
        return new Uint8Array(length);
    }
}
MessageBuffer.emptyBuffer = new Uint8Array(0);
class ReadableStreamWrapper {
    constructor(socket) {
        this.socket = socket;
        this._onData = new events.Emitter();
        this._messageListener = (event) => {
            const blob = event.data;
            blob.arrayBuffer().then((buffer) => {
                this._onData.fire(new Uint8Array(buffer));
            });
        };
        this.socket.addEventListener('message', this._messageListener);
    }
    onClose(listener) {
        this.socket.addEventListener('close', listener);
        return disposable.Disposable.create(() => this.socket.removeEventListener('close', listener));
    }
    onError(listener) {
        this.socket.addEventListener('error', listener);
        return disposable.Disposable.create(() => this.socket.removeEventListener('error', listener));
    }
    onEnd(listener) {
        this.socket.addEventListener('end', listener);
        return disposable.Disposable.create(() => this.socket.removeEventListener('end', listener));
    }
    onData(listener) {
        return this._onData.event(listener);
    }
}
class WritableStreamWrapper {
    constructor(socket) {
        this.socket = socket;
    }
    onClose(listener) {
        this.socket.addEventListener('close', listener);
        return disposable.Disposable.create(() => this.socket.removeEventListener('close', listener));
    }
    onError(listener) {
        this.socket.addEventListener('error', listener);
        return disposable.Disposable.create(() => this.socket.removeEventListener('error', listener));
    }
    onEnd(listener) {
        this.socket.addEventListener('end', listener);
        return disposable.Disposable.create(() => this.socket.removeEventListener('end', listener));
    }
    write(data, encoding) {
        if (typeof data === 'string') {
            if (encoding !== undefined && encoding !== 'utf-8') {
                throw new Error(`In a Browser environments only utf-8 text encding is supported. But got encoding: ${encoding}`);
            }
            this.socket.send(data);
        }
        else {
            this.socket.send(data);
        }
        return Promise.resolve();
    }
    end() {
        this.socket.close();
    }
}
const _textEncoder = new TextEncoder();
const _ril = Object.freeze({
    messageBuffer: Object.freeze({
        create: (encoding) => new MessageBuffer(encoding)
    }),
    applicationJson: Object.freeze({
        encoder: Object.freeze({
            name: 'application/json',
            encode: (msg, options) => {
                if (options.charset !== 'utf-8') {
                    throw new Error(`In a Browser environments only utf-8 text encding is supported. But got encoding: ${options.charset}`);
                }
                return Promise.resolve(_textEncoder.encode(JSON.stringify(msg, undefined, 0)));
            }
        }),
        decoder: Object.freeze({
            name: 'application/json',
            decode: (buffer, options) => {
                if (!(buffer instanceof Uint8Array)) {
                    throw new Error(`In a Browser environments only Uint8Arrays are supported.`);
                }
                return Promise.resolve(JSON.parse(new TextDecoder(options.charset).decode(buffer)));
            }
        })
    }),
    stream: Object.freeze({
        asReadableStream: (socket) => new ReadableStreamWrapper(socket),
        asWritableStream: (socket) => new WritableStreamWrapper(socket)
    }),
    console: console,
    timer: Object.freeze({
        setTimeout(callback, ms, ...args) {
            return setTimeout(callback, ms, ...args);
        },
        clearTimeout(handle) {
            clearTimeout(handle);
        },
        setImmediate(callback, ...args) {
            return setTimeout(callback, 0, ...args);
        },
        clearImmediate(handle) {
            clearTimeout(handle);
        }
    })
});
function RIL() {
    return _ril;
}
(function (RIL) {
    function install() {
        ral.default.install(_ril);
    }
    RIL.install = install;
})(RIL || (RIL = {}));
exports.default = RIL;

});

var is$2 = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringArray = exports.array = exports.func = exports.error = exports.number = exports.string = exports.boolean = void 0;
function boolean(value) {
    return value === true || value === false;
}
exports.boolean = boolean;
function string(value) {
    return typeof value === 'string' || value instanceof String;
}
exports.string = string;
function number(value) {
    return typeof value === 'number' || value instanceof Number;
}
exports.number = number;
function error(value) {
    return value instanceof Error;
}
exports.error = error;
function func(value) {
    return typeof value === 'function';
}
exports.func = func;
function array(value) {
    return Array.isArray(value);
}
exports.array = array;
function stringArray(value) {
    return array(value) && value.every(elem => string(elem));
}
exports.stringArray = stringArray;

});

var messages$1 = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isResponseMessage = exports.isNotificationMessage = exports.isRequestMessage = exports.NotificationType9 = exports.NotificationType8 = exports.NotificationType7 = exports.NotificationType6 = exports.NotificationType5 = exports.NotificationType4 = exports.NotificationType3 = exports.NotificationType2 = exports.NotificationType1 = exports.NotificationType0 = exports.NotificationType = exports.RequestType9 = exports.RequestType8 = exports.RequestType7 = exports.RequestType6 = exports.RequestType5 = exports.RequestType4 = exports.RequestType3 = exports.RequestType2 = exports.RequestType1 = exports.RequestType = exports.RequestType0 = exports.AbstractMessageSignature = exports.ParameterStructures = exports.ResponseError = exports.ErrorCodes = void 0;

/**
 * Predefined error codes.
 */
var ErrorCodes;
(function (ErrorCodes) {
    // Defined by JSON RPC
    ErrorCodes.ParseError = -32700;
    ErrorCodes.InvalidRequest = -32600;
    ErrorCodes.MethodNotFound = -32601;
    ErrorCodes.InvalidParams = -32602;
    ErrorCodes.InternalError = -32603;
    /**
     * This is the start range of JSON RPC reserved error codes.
     * It doesn't denote a real error code. No application error codes should
     * be defined between the start and end range. For backwards
     * compatibility the `ServerNotInitialized` and the `UnknownErrorCode`
     * are left in the range.
     *
     * @since 3.16.0
    */
    ErrorCodes.jsonrpcReservedErrorRangeStart = -32099;
    /** @deprecated use  jsonrpcReservedErrorRangeStart */
    ErrorCodes.serverErrorStart = ErrorCodes.jsonrpcReservedErrorRangeStart;
    ErrorCodes.MessageWriteError = -32099;
    ErrorCodes.MessageReadError = -32098;
    ErrorCodes.ServerNotInitialized = -32002;
    ErrorCodes.UnknownErrorCode = -32001;
    /**
     * This is the end range of JSON RPC reserved error codes.
     * It doesn't denote a real error code.
     *
     * @since 3.16.0
    */
    ErrorCodes.jsonrpcReservedErrorRangeEnd = -32000;
    /** @deprecated use  jsonrpcReservedErrorRangeEnd */
    ErrorCodes.serverErrorEnd = ErrorCodes.jsonrpcReservedErrorRangeEnd;
})(ErrorCodes = exports.ErrorCodes || (exports.ErrorCodes = {}));
/**
 * An error object return in a response in case a request
 * has failed.
 */
class ResponseError extends Error {
    constructor(code, message, data) {
        super(message);
        this.code = is$2.number(code) ? code : ErrorCodes.UnknownErrorCode;
        this.data = data;
        Object.setPrototypeOf(this, ResponseError.prototype);
    }
    toJson() {
        const result = {
            code: this.code,
            message: this.message
        };
        if (this.data !== undefined) {
            result.data = this.data;
        }
        return result;
    }
}
exports.ResponseError = ResponseError;
class ParameterStructures {
    constructor(kind) {
        this.kind = kind;
    }
    static is(value) {
        return value === ParameterStructures.auto || value === ParameterStructures.byName || value === ParameterStructures.byPosition;
    }
    toString() {
        return this.kind;
    }
}
exports.ParameterStructures = ParameterStructures;
/**
 * The parameter structure is automatically inferred on the number of parameters
 * and the parameter type in case of a single param.
 */
ParameterStructures.auto = new ParameterStructures('auto');
/**
 * Forces `byPosition` parameter structure. This is useful if you have a single
 * parameter which has a literal type.
 */
ParameterStructures.byPosition = new ParameterStructures('byPosition');
/**
 * Forces `byName` parameter structure. This is only useful when having a single
 * parameter. The library will report errors if used with a different number of
 * parameters.
 */
ParameterStructures.byName = new ParameterStructures('byName');
/**
 * An abstract implementation of a MessageType.
 */
class AbstractMessageSignature {
    constructor(method, numberOfParams) {
        this.method = method;
        this.numberOfParams = numberOfParams;
    }
    get parameterStructures() {
        return ParameterStructures.auto;
    }
}
exports.AbstractMessageSignature = AbstractMessageSignature;
/**
 * Classes to type request response pairs
 */
class RequestType0 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 0);
    }
}
exports.RequestType0 = RequestType0;
class RequestType extends AbstractMessageSignature {
    constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
    }
    get parameterStructures() {
        return this._parameterStructures;
    }
}
exports.RequestType = RequestType;
class RequestType1 extends AbstractMessageSignature {
    constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
    }
    get parameterStructures() {
        return this._parameterStructures;
    }
}
exports.RequestType1 = RequestType1;
class RequestType2 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 2);
    }
}
exports.RequestType2 = RequestType2;
class RequestType3 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 3);
    }
}
exports.RequestType3 = RequestType3;
class RequestType4 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 4);
    }
}
exports.RequestType4 = RequestType4;
class RequestType5 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 5);
    }
}
exports.RequestType5 = RequestType5;
class RequestType6 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 6);
    }
}
exports.RequestType6 = RequestType6;
class RequestType7 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 7);
    }
}
exports.RequestType7 = RequestType7;
class RequestType8 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 8);
    }
}
exports.RequestType8 = RequestType8;
class RequestType9 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 9);
    }
}
exports.RequestType9 = RequestType9;
class NotificationType extends AbstractMessageSignature {
    constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
    }
    get parameterStructures() {
        return this._parameterStructures;
    }
}
exports.NotificationType = NotificationType;
class NotificationType0 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 0);
    }
}
exports.NotificationType0 = NotificationType0;
class NotificationType1 extends AbstractMessageSignature {
    constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
    }
    get parameterStructures() {
        return this._parameterStructures;
    }
}
exports.NotificationType1 = NotificationType1;
class NotificationType2 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 2);
    }
}
exports.NotificationType2 = NotificationType2;
class NotificationType3 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 3);
    }
}
exports.NotificationType3 = NotificationType3;
class NotificationType4 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 4);
    }
}
exports.NotificationType4 = NotificationType4;
class NotificationType5 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 5);
    }
}
exports.NotificationType5 = NotificationType5;
class NotificationType6 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 6);
    }
}
exports.NotificationType6 = NotificationType6;
class NotificationType7 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 7);
    }
}
exports.NotificationType7 = NotificationType7;
class NotificationType8 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 8);
    }
}
exports.NotificationType8 = NotificationType8;
class NotificationType9 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 9);
    }
}
exports.NotificationType9 = NotificationType9;
/**
 * Tests if the given message is a request message
 */
function isRequestMessage(message) {
    const candidate = message;
    return candidate && is$2.string(candidate.method) && (is$2.string(candidate.id) || is$2.number(candidate.id));
}
exports.isRequestMessage = isRequestMessage;
/**
 * Tests if the given message is a notification message
 */
function isNotificationMessage(message) {
    const candidate = message;
    return candidate && is$2.string(candidate.method) && message.id === void 0;
}
exports.isNotificationMessage = isNotificationMessage;
/**
 * Tests if the given message is a response message
 */
function isResponseMessage(message) {
    const candidate = message;
    return candidate && (candidate.result !== void 0 || !!candidate.error) && (is$2.string(candidate.id) || is$2.number(candidate.id) || candidate.id === null);
}
exports.isResponseMessage = isResponseMessage;

});

var cancellation = createCommonjsModule(function (module, exports) {
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancellationTokenSource = exports.CancellationToken = void 0;



var CancellationToken;
(function (CancellationToken) {
    CancellationToken.None = Object.freeze({
        isCancellationRequested: false,
        onCancellationRequested: events.Event.None
    });
    CancellationToken.Cancelled = Object.freeze({
        isCancellationRequested: true,
        onCancellationRequested: events.Event.None
    });
    function is(value) {
        const candidate = value;
        return candidate && (candidate === CancellationToken.None
            || candidate === CancellationToken.Cancelled
            || (is$2.boolean(candidate.isCancellationRequested) && !!candidate.onCancellationRequested));
    }
    CancellationToken.is = is;
})(CancellationToken = exports.CancellationToken || (exports.CancellationToken = {}));
const shortcutEvent = Object.freeze(function (callback, context) {
    const handle = ral.default().timer.setTimeout(callback.bind(context), 0);
    return { dispose() { ral.default().timer.clearTimeout(handle); } };
});
class MutableToken {
    constructor() {
        this._isCancelled = false;
    }
    cancel() {
        if (!this._isCancelled) {
            this._isCancelled = true;
            if (this._emitter) {
                this._emitter.fire(undefined);
                this.dispose();
            }
        }
    }
    get isCancellationRequested() {
        return this._isCancelled;
    }
    get onCancellationRequested() {
        if (this._isCancelled) {
            return shortcutEvent;
        }
        if (!this._emitter) {
            this._emitter = new events.Emitter();
        }
        return this._emitter.event;
    }
    dispose() {
        if (this._emitter) {
            this._emitter.dispose();
            this._emitter = undefined;
        }
    }
}
class CancellationTokenSource {
    get token() {
        if (!this._token) {
            // be lazy and create the token only when
            // actually needed
            this._token = new MutableToken();
        }
        return this._token;
    }
    cancel() {
        if (!this._token) {
            // save an object by returning the default
            // cancelled token when cancellation happens
            // before someone asks for the token
            this._token = CancellationToken.Cancelled;
        }
        else {
            this._token.cancel();
        }
    }
    dispose() {
        if (!this._token) {
            // ensure to initialize with an empty token if we had none
            this._token = CancellationToken.None;
        }
        else if (this._token instanceof MutableToken) {
            // actually dispose
            this._token.dispose();
        }
    }
}
exports.CancellationTokenSource = CancellationTokenSource;

});

var messageReader$1 = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadableStreamMessageReader = exports.AbstractMessageReader = exports.MessageReader = void 0;
(function (MessageReader) {
    function is(value) {
        let candidate = value;
        return candidate && is$2.func(candidate.listen) && is$2.func(candidate.dispose) &&
            is$2.func(candidate.onError) && is$2.func(candidate.onClose) && is$2.func(candidate.onPartialMessage);
    }
    MessageReader.is = is;
})(exports.MessageReader || (exports.MessageReader = {}));
class AbstractMessageReader {
    constructor() {
        this.errorEmitter = new events.Emitter();
        this.closeEmitter = new events.Emitter();
        this.partialMessageEmitter = new events.Emitter();
    }
    dispose() {
        this.errorEmitter.dispose();
        this.closeEmitter.dispose();
    }
    get onError() {
        return this.errorEmitter.event;
    }
    fireError(error) {
        this.errorEmitter.fire(this.asError(error));
    }
    get onClose() {
        return this.closeEmitter.event;
    }
    fireClose() {
        this.closeEmitter.fire(undefined);
    }
    get onPartialMessage() {
        return this.partialMessageEmitter.event;
    }
    firePartialMessage(info) {
        this.partialMessageEmitter.fire(info);
    }
    asError(error) {
        if (error instanceof Error) {
            return error;
        }
        else {
            return new Error(`Reader received error. Reason: ${is$2.string(error.message) ? error.message : 'unknown'}`);
        }
    }
}
exports.AbstractMessageReader = AbstractMessageReader;
var ResolvedMessageReaderOptions;
(function (ResolvedMessageReaderOptions) {
    function fromOptions(options) {
        var _a;
        let charset;
        let contentDecoder;
        const contentDecoders = new Map();
        let contentTypeDecoder;
        const contentTypeDecoders = new Map();
        if (options === undefined || typeof options === 'string') {
            charset = options !== null && options !== void 0 ? options : 'utf-8';
        }
        else {
            charset = (_a = options.charset) !== null && _a !== void 0 ? _a : 'utf-8';
            if (options.contentDecoder !== undefined) {
                contentDecoder = options.contentDecoder;
                contentDecoders.set(contentDecoder.name, contentDecoder);
            }
            if (options.contentDecoders !== undefined) {
                for (const decoder of options.contentDecoders) {
                    contentDecoders.set(decoder.name, decoder);
                }
            }
            if (options.contentTypeDecoder !== undefined) {
                contentTypeDecoder = options.contentTypeDecoder;
                contentTypeDecoders.set(contentTypeDecoder.name, contentTypeDecoder);
            }
            if (options.contentTypeDecoders !== undefined) {
                for (const decoder of options.contentTypeDecoders) {
                    contentTypeDecoders.set(decoder.name, decoder);
                }
            }
        }
        if (contentTypeDecoder === undefined) {
            contentTypeDecoder = ral.default().applicationJson.decoder;
            contentTypeDecoders.set(contentTypeDecoder.name, contentTypeDecoder);
        }
        return { charset, contentDecoder, contentDecoders, contentTypeDecoder, contentTypeDecoders };
    }
    ResolvedMessageReaderOptions.fromOptions = fromOptions;
})(ResolvedMessageReaderOptions || (ResolvedMessageReaderOptions = {}));
class ReadableStreamMessageReader extends AbstractMessageReader {
    constructor(readable, options) {
        super();
        this.readable = readable;
        this.options = ResolvedMessageReaderOptions.fromOptions(options);
        this.buffer = ral.default().messageBuffer.create(this.options.charset);
        this._partialMessageTimeout = 10000;
        this.nextMessageLength = -1;
        this.messageToken = 0;
    }
    set partialMessageTimeout(timeout) {
        this._partialMessageTimeout = timeout;
    }
    get partialMessageTimeout() {
        return this._partialMessageTimeout;
    }
    listen(callback) {
        this.nextMessageLength = -1;
        this.messageToken = 0;
        this.partialMessageTimer = undefined;
        this.callback = callback;
        const result = this.readable.onData((data) => {
            this.onData(data);
        });
        this.readable.onError((error) => this.fireError(error));
        this.readable.onClose(() => this.fireClose());
        return result;
    }
    onData(data) {
        this.buffer.append(data);
        while (true) {
            if (this.nextMessageLength === -1) {
                const headers = this.buffer.tryReadHeaders();
                if (!headers) {
                    return;
                }
                const contentLength = headers.get('Content-Length');
                if (!contentLength) {
                    throw new Error('Header must provide a Content-Length property.');
                }
                const length = parseInt(contentLength);
                if (isNaN(length)) {
                    throw new Error('Content-Length value must be a number.');
                }
                this.nextMessageLength = length;
            }
            const body = this.buffer.tryReadBody(this.nextMessageLength);
            if (body === undefined) {
                /** We haven't received the full message yet. */
                this.setPartialMessageTimer();
                return;
            }
            this.clearPartialMessageTimer();
            this.nextMessageLength = -1;
            let p;
            if (this.options.contentDecoder !== undefined) {
                p = this.options.contentDecoder.decode(body);
            }
            else {
                p = Promise.resolve(body);
            }
            p.then((value) => {
                this.options.contentTypeDecoder.decode(value, this.options).then((msg) => {
                    this.callback(msg);
                }, (error) => {
                    this.fireError(error);
                });
            }, (error) => {
                this.fireError(error);
            });
        }
    }
    clearPartialMessageTimer() {
        if (this.partialMessageTimer) {
            ral.default().timer.clearTimeout(this.partialMessageTimer);
            this.partialMessageTimer = undefined;
        }
    }
    setPartialMessageTimer() {
        this.clearPartialMessageTimer();
        if (this._partialMessageTimeout <= 0) {
            return;
        }
        this.partialMessageTimer = ral.default().timer.setTimeout((token, timeout) => {
            this.partialMessageTimer = undefined;
            if (token === this.messageToken) {
                this.firePartialMessage({ messageToken: token, waitingTime: timeout });
                this.setPartialMessageTimer();
            }
        }, this._partialMessageTimeout, this.messageToken, this._partialMessageTimeout);
    }
}
exports.ReadableStreamMessageReader = ReadableStreamMessageReader;

});

var semaphore = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Semaphore = void 0;

class Semaphore {
    constructor(capacity = 1) {
        if (capacity <= 0) {
            throw new Error('Capacity must be greater than 0');
        }
        this._capacity = capacity;
        this._active = 0;
        this._waiting = [];
    }
    lock(thunk) {
        return new Promise((resolve, reject) => {
            this._waiting.push({ thunk, resolve, reject });
            this.runNext();
        });
    }
    get active() {
        return this._active;
    }
    runNext() {
        if (this._waiting.length === 0 || this._active === this._capacity) {
            return;
        }
        ral.default().timer.setImmediate(() => this.doRunNext());
    }
    doRunNext() {
        if (this._waiting.length === 0 || this._active === this._capacity) {
            return;
        }
        const next = this._waiting.shift();
        this._active++;
        if (this._active > this._capacity) {
            throw new Error(`To many thunks active`);
        }
        try {
            const result = next.thunk();
            if (result instanceof Promise) {
                result.then((value) => {
                    this._active--;
                    next.resolve(value);
                    this.runNext();
                }, (err) => {
                    this._active--;
                    next.reject(err);
                    this.runNext();
                });
            }
            else {
                this._active--;
                next.resolve(result);
                this.runNext();
            }
        }
        catch (err) {
            this._active--;
            next.reject(err);
            this.runNext();
        }
    }
}
exports.Semaphore = Semaphore;

});

var messageWriter$1 = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteableStreamMessageWriter = exports.AbstractMessageWriter = exports.MessageWriter = void 0;




const ContentLength = 'Content-Length: ';
const CRLF = '\r\n';
(function (MessageWriter) {
    function is(value) {
        let candidate = value;
        return candidate && is$2.func(candidate.dispose) && is$2.func(candidate.onClose) &&
            is$2.func(candidate.onError) && is$2.func(candidate.write);
    }
    MessageWriter.is = is;
})(exports.MessageWriter || (exports.MessageWriter = {}));
class AbstractMessageWriter {
    constructor() {
        this.errorEmitter = new events.Emitter();
        this.closeEmitter = new events.Emitter();
    }
    dispose() {
        this.errorEmitter.dispose();
        this.closeEmitter.dispose();
    }
    get onError() {
        return this.errorEmitter.event;
    }
    fireError(error, message, count) {
        this.errorEmitter.fire([this.asError(error), message, count]);
    }
    get onClose() {
        return this.closeEmitter.event;
    }
    fireClose() {
        this.closeEmitter.fire(undefined);
    }
    asError(error) {
        if (error instanceof Error) {
            return error;
        }
        else {
            return new Error(`Writer received error. Reason: ${is$2.string(error.message) ? error.message : 'unknown'}`);
        }
    }
}
exports.AbstractMessageWriter = AbstractMessageWriter;
var ResolvedMessageWriterOptions;
(function (ResolvedMessageWriterOptions) {
    function fromOptions(options) {
        var _a, _b;
        if (options === undefined || typeof options === 'string') {
            return { charset: options !== null && options !== void 0 ? options : 'utf-8', contentTypeEncoder: ral.default().applicationJson.encoder };
        }
        else {
            return { charset: (_a = options.charset) !== null && _a !== void 0 ? _a : 'utf-8', contentEncoder: options.contentEncoder, contentTypeEncoder: (_b = options.contentTypeEncoder) !== null && _b !== void 0 ? _b : ral.default().applicationJson.encoder };
        }
    }
    ResolvedMessageWriterOptions.fromOptions = fromOptions;
})(ResolvedMessageWriterOptions || (ResolvedMessageWriterOptions = {}));
class WriteableStreamMessageWriter extends AbstractMessageWriter {
    constructor(writable, options) {
        super();
        this.writable = writable;
        this.options = ResolvedMessageWriterOptions.fromOptions(options);
        this.errorCount = 0;
        this.writeSemaphore = new semaphore.Semaphore(1);
        this.writable.onError((error) => this.fireError(error));
        this.writable.onClose(() => this.fireClose());
    }
    async write(msg) {
        return this.writeSemaphore.lock(async () => {
            const payload = this.options.contentTypeEncoder.encode(msg, this.options).then((buffer) => {
                if (this.options.contentEncoder !== undefined) {
                    return this.options.contentEncoder.encode(buffer);
                }
                else {
                    return buffer;
                }
            });
            return payload.then((buffer) => {
                const headers = [];
                headers.push(ContentLength, buffer.byteLength.toString(), CRLF);
                headers.push(CRLF);
                return this.doWrite(msg, headers, buffer);
            }, (error) => {
                this.fireError(error);
                throw error;
            });
        });
    }
    async doWrite(msg, headers, data) {
        try {
            await this.writable.write(headers.join(''), 'ascii');
            return this.writable.write(data);
        }
        catch (error) {
            this.handleError(error, msg);
            return Promise.reject(error);
        }
    }
    handleError(error, msg) {
        this.errorCount++;
        this.fireError(error, msg, this.errorCount);
    }
    end() {
        this.writable.end();
    }
}
exports.WriteableStreamMessageWriter = WriteableStreamMessageWriter;

});

var linkedMap = createCommonjsModule(function (module, exports) {
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.LRUCache = exports.LinkedMap = exports.Touch = void 0;
var Touch;
(function (Touch) {
    Touch.None = 0;
    Touch.First = 1;
    Touch.AsOld = Touch.First;
    Touch.Last = 2;
    Touch.AsNew = Touch.Last;
})(Touch = exports.Touch || (exports.Touch = {}));
class LinkedMap {
    constructor() {
        this[Symbol.toStringTag] = 'LinkedMap';
        this._map = new Map();
        this._head = undefined;
        this._tail = undefined;
        this._size = 0;
        this._state = 0;
    }
    clear() {
        this._map.clear();
        this._head = undefined;
        this._tail = undefined;
        this._size = 0;
        this._state++;
    }
    isEmpty() {
        return !this._head && !this._tail;
    }
    get size() {
        return this._size;
    }
    get first() {
        var _a;
        return (_a = this._head) === null || _a === void 0 ? void 0 : _a.value;
    }
    get last() {
        var _a;
        return (_a = this._tail) === null || _a === void 0 ? void 0 : _a.value;
    }
    has(key) {
        return this._map.has(key);
    }
    get(key, touch = Touch.None) {
        const item = this._map.get(key);
        if (!item) {
            return undefined;
        }
        if (touch !== Touch.None) {
            this.touch(item, touch);
        }
        return item.value;
    }
    set(key, value, touch = Touch.None) {
        let item = this._map.get(key);
        if (item) {
            item.value = value;
            if (touch !== Touch.None) {
                this.touch(item, touch);
            }
        }
        else {
            item = { key, value, next: undefined, previous: undefined };
            switch (touch) {
                case Touch.None:
                    this.addItemLast(item);
                    break;
                case Touch.First:
                    this.addItemFirst(item);
                    break;
                case Touch.Last:
                    this.addItemLast(item);
                    break;
                default:
                    this.addItemLast(item);
                    break;
            }
            this._map.set(key, item);
            this._size++;
        }
        return this;
    }
    delete(key) {
        return !!this.remove(key);
    }
    remove(key) {
        const item = this._map.get(key);
        if (!item) {
            return undefined;
        }
        this._map.delete(key);
        this.removeItem(item);
        this._size--;
        return item.value;
    }
    shift() {
        if (!this._head && !this._tail) {
            return undefined;
        }
        if (!this._head || !this._tail) {
            throw new Error('Invalid list');
        }
        const item = this._head;
        this._map.delete(item.key);
        this.removeItem(item);
        this._size--;
        return item.value;
    }
    forEach(callbackfn, thisArg) {
        const state = this._state;
        let current = this._head;
        while (current) {
            if (thisArg) {
                callbackfn.bind(thisArg)(current.value, current.key, this);
            }
            else {
                callbackfn(current.value, current.key, this);
            }
            if (this._state !== state) {
                throw new Error(`LinkedMap got modified during iteration.`);
            }
            current = current.next;
        }
    }
    keys() {
        const map = this;
        const state = this._state;
        let current = this._head;
        const iterator = {
            [Symbol.iterator]() {
                return iterator;
            },
            next() {
                if (map._state !== state) {
                    throw new Error(`LinkedMap got modified during iteration.`);
                }
                if (current) {
                    const result = { value: current.key, done: false };
                    current = current.next;
                    return result;
                }
                else {
                    return { value: undefined, done: true };
                }
            }
        };
        return iterator;
    }
    values() {
        const map = this;
        const state = this._state;
        let current = this._head;
        const iterator = {
            [Symbol.iterator]() {
                return iterator;
            },
            next() {
                if (map._state !== state) {
                    throw new Error(`LinkedMap got modified during iteration.`);
                }
                if (current) {
                    const result = { value: current.value, done: false };
                    current = current.next;
                    return result;
                }
                else {
                    return { value: undefined, done: true };
                }
            }
        };
        return iterator;
    }
    entries() {
        const map = this;
        const state = this._state;
        let current = this._head;
        const iterator = {
            [Symbol.iterator]() {
                return iterator;
            },
            next() {
                if (map._state !== state) {
                    throw new Error(`LinkedMap got modified during iteration.`);
                }
                if (current) {
                    const result = { value: [current.key, current.value], done: false };
                    current = current.next;
                    return result;
                }
                else {
                    return { value: undefined, done: true };
                }
            }
        };
        return iterator;
    }
    [Symbol.iterator]() {
        return this.entries();
    }
    trimOld(newSize) {
        if (newSize >= this.size) {
            return;
        }
        if (newSize === 0) {
            this.clear();
            return;
        }
        let current = this._head;
        let currentSize = this.size;
        while (current && currentSize > newSize) {
            this._map.delete(current.key);
            current = current.next;
            currentSize--;
        }
        this._head = current;
        this._size = currentSize;
        if (current) {
            current.previous = undefined;
        }
        this._state++;
    }
    addItemFirst(item) {
        // First time Insert
        if (!this._head && !this._tail) {
            this._tail = item;
        }
        else if (!this._head) {
            throw new Error('Invalid list');
        }
        else {
            item.next = this._head;
            this._head.previous = item;
        }
        this._head = item;
        this._state++;
    }
    addItemLast(item) {
        // First time Insert
        if (!this._head && !this._tail) {
            this._head = item;
        }
        else if (!this._tail) {
            throw new Error('Invalid list');
        }
        else {
            item.previous = this._tail;
            this._tail.next = item;
        }
        this._tail = item;
        this._state++;
    }
    removeItem(item) {
        if (item === this._head && item === this._tail) {
            this._head = undefined;
            this._tail = undefined;
        }
        else if (item === this._head) {
            // This can only happend if size === 1 which is handle
            // by the case above.
            if (!item.next) {
                throw new Error('Invalid list');
            }
            item.next.previous = undefined;
            this._head = item.next;
        }
        else if (item === this._tail) {
            // This can only happend if size === 1 which is handle
            // by the case above.
            if (!item.previous) {
                throw new Error('Invalid list');
            }
            item.previous.next = undefined;
            this._tail = item.previous;
        }
        else {
            const next = item.next;
            const previous = item.previous;
            if (!next || !previous) {
                throw new Error('Invalid list');
            }
            next.previous = previous;
            previous.next = next;
        }
        item.next = undefined;
        item.previous = undefined;
        this._state++;
    }
    touch(item, touch) {
        if (!this._head || !this._tail) {
            throw new Error('Invalid list');
        }
        if ((touch !== Touch.First && touch !== Touch.Last)) {
            return;
        }
        if (touch === Touch.First) {
            if (item === this._head) {
                return;
            }
            const next = item.next;
            const previous = item.previous;
            // Unlink the item
            if (item === this._tail) {
                // previous must be defined since item was not head but is tail
                // So there are more than on item in the map
                previous.next = undefined;
                this._tail = previous;
            }
            else {
                // Both next and previous are not undefined since item was neither head nor tail.
                next.previous = previous;
                previous.next = next;
            }
            // Insert the node at head
            item.previous = undefined;
            item.next = this._head;
            this._head.previous = item;
            this._head = item;
            this._state++;
        }
        else if (touch === Touch.Last) {
            if (item === this._tail) {
                return;
            }
            const next = item.next;
            const previous = item.previous;
            // Unlink the item.
            if (item === this._head) {
                // next must be defined since item was not tail but is head
                // So there are more than on item in the map
                next.previous = undefined;
                this._head = next;
            }
            else {
                // Both next and previous are not undefined since item was neither head nor tail.
                next.previous = previous;
                previous.next = next;
            }
            item.next = undefined;
            item.previous = this._tail;
            this._tail.next = item;
            this._tail = item;
            this._state++;
        }
    }
    toJSON() {
        const data = [];
        this.forEach((value, key) => {
            data.push([key, value]);
        });
        return data;
    }
    fromJSON(data) {
        this.clear();
        for (const [key, value] of data) {
            this.set(key, value);
        }
    }
}
exports.LinkedMap = LinkedMap;
class LRUCache extends LinkedMap {
    constructor(limit, ratio = 1) {
        super();
        this._limit = limit;
        this._ratio = Math.min(Math.max(0, ratio), 1);
    }
    get limit() {
        return this._limit;
    }
    set limit(limit) {
        this._limit = limit;
        this.checkTrim();
    }
    get ratio() {
        return this._ratio;
    }
    set ratio(ratio) {
        this._ratio = Math.min(Math.max(0, ratio), 1);
        this.checkTrim();
    }
    get(key, touch = Touch.AsNew) {
        return super.get(key, touch);
    }
    peek(key) {
        return super.get(key, Touch.None);
    }
    set(key, value) {
        super.set(key, value, Touch.Last);
        this.checkTrim();
        return this;
    }
    checkTrim() {
        if (this.size > this._limit) {
            this.trimOld(Math.round(this._limit * this._ratio));
        }
    }
}
exports.LRUCache = LRUCache;

});

var connection$2 = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageConnection = exports.ConnectionOptions = exports.CancellationStrategy = exports.CancellationSenderStrategy = exports.CancellationReceiverStrategy = exports.ConnectionStrategy = exports.ConnectionError = exports.ConnectionErrors = exports.LogTraceNotification = exports.SetTraceNotification = exports.TraceFormat = exports.Trace = exports.NullLogger = exports.ProgressType = void 0;






var CancelNotification;
(function (CancelNotification) {
    CancelNotification.type = new messages$1.NotificationType('$/cancelRequest');
})(CancelNotification || (CancelNotification = {}));
var ProgressNotification;
(function (ProgressNotification) {
    ProgressNotification.type = new messages$1.NotificationType('$/progress');
})(ProgressNotification || (ProgressNotification = {}));
class ProgressType {
    constructor() {
    }
}
exports.ProgressType = ProgressType;
var StarRequestHandler;
(function (StarRequestHandler) {
    function is(value) {
        return is$2.func(value);
    }
    StarRequestHandler.is = is;
})(StarRequestHandler || (StarRequestHandler = {}));
exports.NullLogger = Object.freeze({
    error: () => { },
    warn: () => { },
    info: () => { },
    log: () => { }
});
var Trace;
(function (Trace) {
    Trace[Trace["Off"] = 0] = "Off";
    Trace[Trace["Messages"] = 1] = "Messages";
    Trace[Trace["Verbose"] = 2] = "Verbose";
})(Trace = exports.Trace || (exports.Trace = {}));
(function (Trace) {
    function fromString(value) {
        if (!is$2.string(value)) {
            return Trace.Off;
        }
        value = value.toLowerCase();
        switch (value) {
            case 'off':
                return Trace.Off;
            case 'messages':
                return Trace.Messages;
            case 'verbose':
                return Trace.Verbose;
            default:
                return Trace.Off;
        }
    }
    Trace.fromString = fromString;
    function toString(value) {
        switch (value) {
            case Trace.Off:
                return 'off';
            case Trace.Messages:
                return 'messages';
            case Trace.Verbose:
                return 'verbose';
            default:
                return 'off';
        }
    }
    Trace.toString = toString;
})(Trace = exports.Trace || (exports.Trace = {}));
var TraceFormat;
(function (TraceFormat) {
    TraceFormat["Text"] = "text";
    TraceFormat["JSON"] = "json";
})(TraceFormat = exports.TraceFormat || (exports.TraceFormat = {}));
(function (TraceFormat) {
    function fromString(value) {
        if (!is$2.string(value)) {
            return TraceFormat.Text;
        }
        value = value.toLowerCase();
        if (value === 'json') {
            return TraceFormat.JSON;
        }
        else {
            return TraceFormat.Text;
        }
    }
    TraceFormat.fromString = fromString;
})(TraceFormat = exports.TraceFormat || (exports.TraceFormat = {}));
var SetTraceNotification;
(function (SetTraceNotification) {
    SetTraceNotification.type = new messages$1.NotificationType('$/setTrace');
})(SetTraceNotification = exports.SetTraceNotification || (exports.SetTraceNotification = {}));
var LogTraceNotification;
(function (LogTraceNotification) {
    LogTraceNotification.type = new messages$1.NotificationType('$/logTrace');
})(LogTraceNotification = exports.LogTraceNotification || (exports.LogTraceNotification = {}));
var ConnectionErrors;
(function (ConnectionErrors) {
    /**
     * The connection is closed.
     */
    ConnectionErrors[ConnectionErrors["Closed"] = 1] = "Closed";
    /**
     * The connection got disposed.
     */
    ConnectionErrors[ConnectionErrors["Disposed"] = 2] = "Disposed";
    /**
     * The connection is already in listening mode.
     */
    ConnectionErrors[ConnectionErrors["AlreadyListening"] = 3] = "AlreadyListening";
})(ConnectionErrors = exports.ConnectionErrors || (exports.ConnectionErrors = {}));
class ConnectionError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, ConnectionError.prototype);
    }
}
exports.ConnectionError = ConnectionError;
var ConnectionStrategy;
(function (ConnectionStrategy) {
    function is(value) {
        const candidate = value;
        return candidate && is$2.func(candidate.cancelUndispatched);
    }
    ConnectionStrategy.is = is;
})(ConnectionStrategy = exports.ConnectionStrategy || (exports.ConnectionStrategy = {}));
var CancellationReceiverStrategy;
(function (CancellationReceiverStrategy) {
    CancellationReceiverStrategy.Message = Object.freeze({
        createCancellationTokenSource(_) {
            return new cancellation.CancellationTokenSource();
        }
    });
    function is(value) {
        const candidate = value;
        return candidate && is$2.func(candidate.createCancellationTokenSource);
    }
    CancellationReceiverStrategy.is = is;
})(CancellationReceiverStrategy = exports.CancellationReceiverStrategy || (exports.CancellationReceiverStrategy = {}));
var CancellationSenderStrategy;
(function (CancellationSenderStrategy) {
    CancellationSenderStrategy.Message = Object.freeze({
        sendCancellation(conn, id) {
            conn.sendNotification(CancelNotification.type, { id });
        },
        cleanup(_) { }
    });
    function is(value) {
        const candidate = value;
        return candidate && is$2.func(candidate.sendCancellation) && is$2.func(candidate.cleanup);
    }
    CancellationSenderStrategy.is = is;
})(CancellationSenderStrategy = exports.CancellationSenderStrategy || (exports.CancellationSenderStrategy = {}));
var CancellationStrategy;
(function (CancellationStrategy) {
    CancellationStrategy.Message = Object.freeze({
        receiver: CancellationReceiverStrategy.Message,
        sender: CancellationSenderStrategy.Message
    });
    function is(value) {
        const candidate = value;
        return candidate && CancellationReceiverStrategy.is(candidate.receiver) && CancellationSenderStrategy.is(candidate.sender);
    }
    CancellationStrategy.is = is;
})(CancellationStrategy = exports.CancellationStrategy || (exports.CancellationStrategy = {}));
(function (ConnectionOptions) {
    function is(value) {
        const candidate = value;
        return candidate && (CancellationStrategy.is(candidate.cancellationStrategy) || ConnectionStrategy.is(candidate.connectionStrategy));
    }
    ConnectionOptions.is = is;
})(exports.ConnectionOptions || (exports.ConnectionOptions = {}));
var ConnectionState;
(function (ConnectionState) {
    ConnectionState[ConnectionState["New"] = 1] = "New";
    ConnectionState[ConnectionState["Listening"] = 2] = "Listening";
    ConnectionState[ConnectionState["Closed"] = 3] = "Closed";
    ConnectionState[ConnectionState["Disposed"] = 4] = "Disposed";
})(ConnectionState || (ConnectionState = {}));
function createMessageConnection(messageReader, messageWriter, _logger, options) {
    const logger = _logger !== undefined ? _logger : exports.NullLogger;
    let sequenceNumber = 0;
    let notificationSequenceNumber = 0;
    let unknownResponseSequenceNumber = 0;
    const version = '2.0';
    let starRequestHandler = undefined;
    const requestHandlers = Object.create(null);
    let starNotificationHandler = undefined;
    const notificationHandlers = Object.create(null);
    const progressHandlers = new Map();
    let timer;
    let messageQueue = new linkedMap.LinkedMap();
    let responsePromises = Object.create(null);
    let knownCanceledRequests = new Set();
    let requestTokens = Object.create(null);
    let trace = Trace.Off;
    let traceFormat = TraceFormat.Text;
    let tracer;
    let state = ConnectionState.New;
    const errorEmitter = new events.Emitter();
    const closeEmitter = new events.Emitter();
    const unhandledNotificationEmitter = new events.Emitter();
    const unhandledProgressEmitter = new events.Emitter();
    const disposeEmitter = new events.Emitter();
    const cancellationStrategy = (options && options.cancellationStrategy) ? options.cancellationStrategy : CancellationStrategy.Message;
    function createRequestQueueKey(id) {
        if (id === null) {
            throw new Error(`Can't send requests with id null since the response can't be correlated.`);
        }
        return 'req-' + id.toString();
    }
    function createResponseQueueKey(id) {
        if (id === null) {
            return 'res-unknown-' + (++unknownResponseSequenceNumber).toString();
        }
        else {
            return 'res-' + id.toString();
        }
    }
    function createNotificationQueueKey() {
        return 'not-' + (++notificationSequenceNumber).toString();
    }
    function addMessageToQueue(queue, message) {
        if (messages$1.isRequestMessage(message)) {
            queue.set(createRequestQueueKey(message.id), message);
        }
        else if (messages$1.isResponseMessage(message)) {
            queue.set(createResponseQueueKey(message.id), message);
        }
        else {
            queue.set(createNotificationQueueKey(), message);
        }
    }
    function cancelUndispatched(_message) {
        return undefined;
    }
    function isListening() {
        return state === ConnectionState.Listening;
    }
    function isClosed() {
        return state === ConnectionState.Closed;
    }
    function isDisposed() {
        return state === ConnectionState.Disposed;
    }
    function closeHandler() {
        if (state === ConnectionState.New || state === ConnectionState.Listening) {
            state = ConnectionState.Closed;
            closeEmitter.fire(undefined);
        }
        // If the connection is disposed don't sent close events.
    }
    function readErrorHandler(error) {
        errorEmitter.fire([error, undefined, undefined]);
    }
    function writeErrorHandler(data) {
        errorEmitter.fire(data);
    }
    messageReader.onClose(closeHandler);
    messageReader.onError(readErrorHandler);
    messageWriter.onClose(closeHandler);
    messageWriter.onError(writeErrorHandler);
    function triggerMessageQueue() {
        if (timer || messageQueue.size === 0) {
            return;
        }
        timer = ral.default().timer.setImmediate(() => {
            timer = undefined;
            processMessageQueue();
        });
    }
    function processMessageQueue() {
        if (messageQueue.size === 0) {
            return;
        }
        const message = messageQueue.shift();
        try {
            if (messages$1.isRequestMessage(message)) {
                handleRequest(message);
            }
            else if (messages$1.isNotificationMessage(message)) {
                handleNotification(message);
            }
            else if (messages$1.isResponseMessage(message)) {
                handleResponse(message);
            }
            else {
                handleInvalidMessage(message);
            }
        }
        finally {
            triggerMessageQueue();
        }
    }
    const callback = (message) => {
        try {
            // We have received a cancellation message. Check if the message is still in the queue
            // and cancel it if allowed to do so.
            if (messages$1.isNotificationMessage(message) && message.method === CancelNotification.type.method) {
                const cancelId = message.params.id;
                const key = createRequestQueueKey(cancelId);
                const toCancel = messageQueue.get(key);
                if (messages$1.isRequestMessage(toCancel)) {
                    const strategy = options === null || options === void 0 ? void 0 : options.connectionStrategy;
                    const response = (strategy && strategy.cancelUndispatched) ? strategy.cancelUndispatched(toCancel, cancelUndispatched) : cancelUndispatched(toCancel);
                    if (response && (response.error !== undefined || response.result !== undefined)) {
                        messageQueue.delete(key);
                        response.id = toCancel.id;
                        traceSendingResponse(response, message.method, Date.now());
                        messageWriter.write(response);
                        return;
                    }
                }
                const tokenKey = String(cancelId);
                const cancellationToken = requestTokens[tokenKey];
                // The request is already running. Cancel the token
                if (cancellationToken !== undefined) {
                    cancellationToken.cancel();
                    traceReceivedNotification(message);
                    return;
                }
                else {
                    // Remember the cancel but still queue the message to
                    // clean up state in process message.
                    knownCanceledRequests.add(cancelId);
                }
            }
            addMessageToQueue(messageQueue, message);
        }
        finally {
            triggerMessageQueue();
        }
    };
    function handleRequest(requestMessage) {
        if (isDisposed()) {
            // we return here silently since we fired an event when the
            // connection got disposed.
            return;
        }
        function reply(resultOrError, method, startTime) {
            const message = {
                jsonrpc: version,
                id: requestMessage.id
            };
            if (resultOrError instanceof messages$1.ResponseError) {
                message.error = resultOrError.toJson();
            }
            else {
                message.result = resultOrError === undefined ? null : resultOrError;
            }
            traceSendingResponse(message, method, startTime);
            messageWriter.write(message);
        }
        function replyError(error, method, startTime) {
            const message = {
                jsonrpc: version,
                id: requestMessage.id,
                error: error.toJson()
            };
            traceSendingResponse(message, method, startTime);
            messageWriter.write(message);
        }
        function replySuccess(result, method, startTime) {
            // The JSON RPC defines that a response must either have a result or an error
            // So we can't treat undefined as a valid response result.
            if (result === undefined) {
                result = null;
            }
            const message = {
                jsonrpc: version,
                id: requestMessage.id,
                result: result
            };
            traceSendingResponse(message, method, startTime);
            messageWriter.write(message);
        }
        traceReceivedRequest(requestMessage);
        const element = requestHandlers[requestMessage.method];
        let type;
        let requestHandler;
        if (element) {
            type = element.type;
            requestHandler = element.handler;
        }
        const startTime = Date.now();
        if (requestHandler || starRequestHandler) {
            const tokenKey = String(requestMessage.id);
            const cancellationSource = cancellationStrategy.receiver.createCancellationTokenSource(tokenKey);
            if (requestMessage.id !== null && knownCanceledRequests.has(requestMessage.id)) {
                cancellationSource.cancel();
            }
            requestTokens[tokenKey] = cancellationSource;
            try {
                let handlerResult;
                if (requestHandler) {
                    if (requestMessage.params === undefined) {
                        if (type !== undefined && type.numberOfParams !== 0) {
                            replyError(new messages$1.ResponseError(messages$1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines ${type.numberOfParams} params but received none.`), requestMessage.method, startTime);
                            return;
                        }
                        handlerResult = requestHandler(cancellationSource.token);
                    }
                    else if (Array.isArray(requestMessage.params)) {
                        if (type !== undefined && type.parameterStructures === messages$1.ParameterStructures.byName) {
                            replyError(new messages$1.ResponseError(messages$1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines parameters by name but received parameters by position`), requestMessage.method, startTime);
                            return;
                        }
                        handlerResult = requestHandler(...requestMessage.params, cancellationSource.token);
                    }
                    else {
                        if (type !== undefined && type.parameterStructures === messages$1.ParameterStructures.byPosition) {
                            replyError(new messages$1.ResponseError(messages$1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines parameters by position but received parameters by name`), requestMessage.method, startTime);
                            return;
                        }
                        handlerResult = requestHandler(requestMessage.params, cancellationSource.token);
                    }
                }
                else if (starRequestHandler) {
                    handlerResult = starRequestHandler(requestMessage.method, requestMessage.params, cancellationSource.token);
                }
                const promise = handlerResult;
                if (!handlerResult) {
                    delete requestTokens[tokenKey];
                    replySuccess(handlerResult, requestMessage.method, startTime);
                }
                else if (promise.then) {
                    promise.then((resultOrError) => {
                        delete requestTokens[tokenKey];
                        reply(resultOrError, requestMessage.method, startTime);
                    }, error => {
                        delete requestTokens[tokenKey];
                        if (error instanceof messages$1.ResponseError) {
                            replyError(error, requestMessage.method, startTime);
                        }
                        else if (error && is$2.string(error.message)) {
                            replyError(new messages$1.ResponseError(messages$1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
                        }
                        else {
                            replyError(new messages$1.ResponseError(messages$1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
                        }
                    });
                }
                else {
                    delete requestTokens[tokenKey];
                    reply(handlerResult, requestMessage.method, startTime);
                }
            }
            catch (error) {
                delete requestTokens[tokenKey];
                if (error instanceof messages$1.ResponseError) {
                    reply(error, requestMessage.method, startTime);
                }
                else if (error && is$2.string(error.message)) {
                    replyError(new messages$1.ResponseError(messages$1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
                }
                else {
                    replyError(new messages$1.ResponseError(messages$1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
                }
            }
        }
        else {
            replyError(new messages$1.ResponseError(messages$1.ErrorCodes.MethodNotFound, `Unhandled method ${requestMessage.method}`), requestMessage.method, startTime);
        }
    }
    function handleResponse(responseMessage) {
        if (isDisposed()) {
            // See handle request.
            return;
        }
        if (responseMessage.id === null) {
            if (responseMessage.error) {
                logger.error(`Received response message without id: Error is: \n${JSON.stringify(responseMessage.error, undefined, 4)}`);
            }
            else {
                logger.error(`Received response message without id. No further error information provided.`);
            }
        }
        else {
            const key = String(responseMessage.id);
            const responsePromise = responsePromises[key];
            traceReceivedResponse(responseMessage, responsePromise);
            if (responsePromise) {
                delete responsePromises[key];
                try {
                    if (responseMessage.error) {
                        const error = responseMessage.error;
                        responsePromise.reject(new messages$1.ResponseError(error.code, error.message, error.data));
                    }
                    else if (responseMessage.result !== undefined) {
                        responsePromise.resolve(responseMessage.result);
                    }
                    else {
                        throw new Error('Should never happen.');
                    }
                }
                catch (error) {
                    if (error.message) {
                        logger.error(`Response handler '${responsePromise.method}' failed with message: ${error.message}`);
                    }
                    else {
                        logger.error(`Response handler '${responsePromise.method}' failed unexpectedly.`);
                    }
                }
            }
        }
    }
    function handleNotification(message) {
        if (isDisposed()) {
            // See handle request.
            return;
        }
        let type = undefined;
        let notificationHandler;
        if (message.method === CancelNotification.type.method) {
            const cancelId = message.params.id;
            knownCanceledRequests.delete(cancelId);
            traceReceivedNotification(message);
            return;
        }
        else {
            const element = notificationHandlers[message.method];
            if (element) {
                notificationHandler = element.handler;
                type = element.type;
            }
        }
        if (notificationHandler || starNotificationHandler) {
            try {
                traceReceivedNotification(message);
                if (notificationHandler) {
                    if (message.params === undefined) {
                        if (type !== undefined) {
                            if (type.numberOfParams !== 0 && type.parameterStructures !== messages$1.ParameterStructures.byName) {
                                logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received none.`);
                            }
                        }
                        notificationHandler();
                    }
                    else if (Array.isArray(message.params)) {
                        if (type !== undefined) {
                            if (type.parameterStructures === messages$1.ParameterStructures.byName) {
                                logger.error(`Notification ${message.method} defines parameters by name but received parameters by position`);
                            }
                            if (type.numberOfParams !== message.params.length) {
                                logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received ${message.params.length} arguments`);
                            }
                        }
                        notificationHandler(...message.params);
                    }
                    else {
                        if (type !== undefined && type.parameterStructures === messages$1.ParameterStructures.byPosition) {
                            logger.error(`Notification ${message.method} defines parameters by position but received parameters by name`);
                        }
                        notificationHandler(message.params);
                    }
                }
                else if (starNotificationHandler) {
                    starNotificationHandler(message.method, message.params);
                }
            }
            catch (error) {
                if (error.message) {
                    logger.error(`Notification handler '${message.method}' failed with message: ${error.message}`);
                }
                else {
                    logger.error(`Notification handler '${message.method}' failed unexpectedly.`);
                }
            }
        }
        else {
            unhandledNotificationEmitter.fire(message);
        }
    }
    function handleInvalidMessage(message) {
        if (!message) {
            logger.error('Received empty message.');
            return;
        }
        logger.error(`Received message which is neither a response nor a notification message:\n${JSON.stringify(message, null, 4)}`);
        // Test whether we find an id to reject the promise
        const responseMessage = message;
        if (is$2.string(responseMessage.id) || is$2.number(responseMessage.id)) {
            const key = String(responseMessage.id);
            const responseHandler = responsePromises[key];
            if (responseHandler) {
                responseHandler.reject(new Error('The received response has neither a result nor an error property.'));
            }
        }
    }
    function traceSendingRequest(message) {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if (trace === Trace.Verbose && message.params) {
                data = `Params: ${JSON.stringify(message.params, null, 4)}\n\n`;
            }
            tracer.log(`Sending request '${message.method} - (${message.id})'.`, data);
        }
        else {
            logLSPMessage('send-request', message);
        }
    }
    function traceSendingNotification(message) {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if (trace === Trace.Verbose) {
                if (message.params) {
                    data = `Params: ${JSON.stringify(message.params, null, 4)}\n\n`;
                }
                else {
                    data = 'No parameters provided.\n\n';
                }
            }
            tracer.log(`Sending notification '${message.method}'.`, data);
        }
        else {
            logLSPMessage('send-notification', message);
        }
    }
    function traceSendingResponse(message, method, startTime) {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if (trace === Trace.Verbose) {
                if (message.error && message.error.data) {
                    data = `Error data: ${JSON.stringify(message.error.data, null, 4)}\n\n`;
                }
                else {
                    if (message.result) {
                        data = `Result: ${JSON.stringify(message.result, null, 4)}\n\n`;
                    }
                    else if (message.error === undefined) {
                        data = 'No result returned.\n\n';
                    }
                }
            }
            tracer.log(`Sending response '${method} - (${message.id})'. Processing request took ${Date.now() - startTime}ms`, data);
        }
        else {
            logLSPMessage('send-response', message);
        }
    }
    function traceReceivedRequest(message) {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if (trace === Trace.Verbose && message.params) {
                data = `Params: ${JSON.stringify(message.params, null, 4)}\n\n`;
            }
            tracer.log(`Received request '${message.method} - (${message.id})'.`, data);
        }
        else {
            logLSPMessage('receive-request', message);
        }
    }
    function traceReceivedNotification(message) {
        if (trace === Trace.Off || !tracer || message.method === LogTraceNotification.type.method) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if (trace === Trace.Verbose) {
                if (message.params) {
                    data = `Params: ${JSON.stringify(message.params, null, 4)}\n\n`;
                }
                else {
                    data = 'No parameters provided.\n\n';
                }
            }
            tracer.log(`Received notification '${message.method}'.`, data);
        }
        else {
            logLSPMessage('receive-notification', message);
        }
    }
    function traceReceivedResponse(message, responsePromise) {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if (trace === Trace.Verbose) {
                if (message.error && message.error.data) {
                    data = `Error data: ${JSON.stringify(message.error.data, null, 4)}\n\n`;
                }
                else {
                    if (message.result) {
                        data = `Result: ${JSON.stringify(message.result, null, 4)}\n\n`;
                    }
                    else if (message.error === undefined) {
                        data = 'No result returned.\n\n';
                    }
                }
            }
            if (responsePromise) {
                const error = message.error ? ` Request failed: ${message.error.message} (${message.error.code}).` : '';
                tracer.log(`Received response '${responsePromise.method} - (${message.id})' in ${Date.now() - responsePromise.timerStart}ms.${error}`, data);
            }
            else {
                tracer.log(`Received response ${message.id} without active response promise.`, data);
            }
        }
        else {
            logLSPMessage('receive-response', message);
        }
    }
    function logLSPMessage(type, message) {
        if (!tracer || trace === Trace.Off) {
            return;
        }
        const lspMessage = {
            isLSPMessage: true,
            type,
            message,
            timestamp: Date.now()
        };
        tracer.log(lspMessage);
    }
    function throwIfClosedOrDisposed() {
        if (isClosed()) {
            throw new ConnectionError(ConnectionErrors.Closed, 'Connection is closed.');
        }
        if (isDisposed()) {
            throw new ConnectionError(ConnectionErrors.Disposed, 'Connection is disposed.');
        }
    }
    function throwIfListening() {
        if (isListening()) {
            throw new ConnectionError(ConnectionErrors.AlreadyListening, 'Connection is already listening');
        }
    }
    function throwIfNotListening() {
        if (!isListening()) {
            throw new Error('Call listen() first.');
        }
    }
    function undefinedToNull(param) {
        if (param === undefined) {
            return null;
        }
        else {
            return param;
        }
    }
    function nullToUndefined(param) {
        if (param === null) {
            return undefined;
        }
        else {
            return param;
        }
    }
    function isNamedParam(param) {
        return param !== undefined && param !== null && !Array.isArray(param) && typeof param === 'object';
    }
    function computeSingleParam(parameterStructures, param) {
        switch (parameterStructures) {
            case messages$1.ParameterStructures.auto:
                if (isNamedParam(param)) {
                    return nullToUndefined(param);
                }
                else {
                    return [undefinedToNull(param)];
                }
            case messages$1.ParameterStructures.byName:
                if (!isNamedParam(param)) {
                    throw new Error(`Received parameters by name but param is not an object literal.`);
                }
                return nullToUndefined(param);
            case messages$1.ParameterStructures.byPosition:
                return [undefinedToNull(param)];
            default:
                throw new Error(`Unknown parameter structure ${parameterStructures.toString()}`);
        }
    }
    function computeMessageParams(type, params) {
        let result;
        const numberOfParams = type.numberOfParams;
        switch (numberOfParams) {
            case 0:
                result = undefined;
                break;
            case 1:
                result = computeSingleParam(type.parameterStructures, params[0]);
                break;
            default:
                result = [];
                for (let i = 0; i < params.length && i < numberOfParams; i++) {
                    result.push(undefinedToNull(params[i]));
                }
                if (params.length < numberOfParams) {
                    for (let i = params.length; i < numberOfParams; i++) {
                        result.push(null);
                    }
                }
                break;
        }
        return result;
    }
    const connection = {
        sendNotification: (type, ...args) => {
            throwIfClosedOrDisposed();
            let method;
            let messageParams;
            if (is$2.string(type)) {
                method = type;
                const first = args[0];
                let paramStart = 0;
                let parameterStructures = messages$1.ParameterStructures.auto;
                if (messages$1.ParameterStructures.is(first)) {
                    paramStart = 1;
                    parameterStructures = first;
                }
                let paramEnd = args.length;
                const numberOfParams = paramEnd - paramStart;
                switch (numberOfParams) {
                    case 0:
                        messageParams = undefined;
                        break;
                    case 1:
                        messageParams = computeSingleParam(parameterStructures, args[paramStart]);
                        break;
                    default:
                        if (parameterStructures === messages$1.ParameterStructures.byName) {
                            throw new Error(`Received ${numberOfParams} parameters for 'by Name' notification parameter structure.`);
                        }
                        messageParams = args.slice(paramStart, paramEnd).map(value => undefinedToNull(value));
                        break;
                }
            }
            else {
                const params = args;
                method = type.method;
                messageParams = computeMessageParams(type, params);
            }
            const notificationMessage = {
                jsonrpc: version,
                method: method,
                params: messageParams
            };
            traceSendingNotification(notificationMessage);
            messageWriter.write(notificationMessage);
        },
        onNotification: (type, handler) => {
            throwIfClosedOrDisposed();
            let method;
            if (is$2.func(type)) {
                starNotificationHandler = type;
            }
            else if (handler) {
                if (is$2.string(type)) {
                    method = type;
                    notificationHandlers[type] = { type: undefined, handler };
                }
                else {
                    method = type.method;
                    notificationHandlers[type.method] = { type, handler };
                }
            }
            return {
                dispose: () => {
                    if (method !== undefined) {
                        delete notificationHandlers[method];
                    }
                    else {
                        starNotificationHandler = undefined;
                    }
                }
            };
        },
        onProgress: (_type, token, handler) => {
            if (progressHandlers.has(token)) {
                throw new Error(`Progress handler for token ${token} already registered`);
            }
            progressHandlers.set(token, handler);
            return {
                dispose: () => {
                    progressHandlers.delete(token);
                }
            };
        },
        sendProgress: (_type, token, value) => {
            connection.sendNotification(ProgressNotification.type, { token, value });
        },
        onUnhandledProgress: unhandledProgressEmitter.event,
        sendRequest: (type, ...args) => {
            throwIfClosedOrDisposed();
            throwIfNotListening();
            let method;
            let messageParams;
            let token = undefined;
            if (is$2.string(type)) {
                method = type;
                const first = args[0];
                const last = args[args.length - 1];
                let paramStart = 0;
                let parameterStructures = messages$1.ParameterStructures.auto;
                if (messages$1.ParameterStructures.is(first)) {
                    paramStart = 1;
                    parameterStructures = first;
                }
                let paramEnd = args.length;
                if (cancellation.CancellationToken.is(last)) {
                    paramEnd = paramEnd - 1;
                    token = last;
                }
                const numberOfParams = paramEnd - paramStart;
                switch (numberOfParams) {
                    case 0:
                        messageParams = undefined;
                        break;
                    case 1:
                        messageParams = computeSingleParam(parameterStructures, args[paramStart]);
                        break;
                    default:
                        if (parameterStructures === messages$1.ParameterStructures.byName) {
                            throw new Error(`Received ${numberOfParams} parameters for 'by Name' request parameter structure.`);
                        }
                        messageParams = args.slice(paramStart, paramEnd).map(value => undefinedToNull(value));
                        break;
                }
            }
            else {
                const params = args;
                method = type.method;
                messageParams = computeMessageParams(type, params);
                const numberOfParams = type.numberOfParams;
                token = cancellation.CancellationToken.is(params[numberOfParams]) ? params[numberOfParams] : undefined;
            }
            const id = sequenceNumber++;
            let disposable;
            if (token) {
                disposable = token.onCancellationRequested(() => {
                    cancellationStrategy.sender.sendCancellation(connection, id);
                });
            }
            const result = new Promise((resolve, reject) => {
                const requestMessage = {
                    jsonrpc: version,
                    id: id,
                    method: method,
                    params: messageParams
                };
                const resolveWithCleanup = (r) => {
                    resolve(r);
                    cancellationStrategy.sender.cleanup(id);
                    disposable === null || disposable === void 0 ? void 0 : disposable.dispose();
                };
                const rejectWithCleanup = (r) => {
                    reject(r);
                    cancellationStrategy.sender.cleanup(id);
                    disposable === null || disposable === void 0 ? void 0 : disposable.dispose();
                };
                let responsePromise = { method: method, timerStart: Date.now(), resolve: resolveWithCleanup, reject: rejectWithCleanup };
                traceSendingRequest(requestMessage);
                try {
                    messageWriter.write(requestMessage);
                }
                catch (e) {
                    // Writing the message failed. So we need to reject the promise.
                    responsePromise.reject(new messages$1.ResponseError(messages$1.ErrorCodes.MessageWriteError, e.message ? e.message : 'Unknown reason'));
                    responsePromise = null;
                }
                if (responsePromise) {
                    responsePromises[String(id)] = responsePromise;
                }
            });
            return result;
        },
        onRequest: (type, handler) => {
            throwIfClosedOrDisposed();
            let method = null;
            if (StarRequestHandler.is(type)) {
                method = undefined;
                starRequestHandler = type;
            }
            else if (is$2.string(type)) {
                method = null;
                if (handler !== undefined) {
                    method = type;
                    requestHandlers[type] = { handler: handler, type: undefined };
                }
            }
            else {
                if (handler !== undefined) {
                    method = type.method;
                    requestHandlers[type.method] = { type, handler };
                }
            }
            return {
                dispose: () => {
                    if (method === null) {
                        return;
                    }
                    if (method !== undefined) {
                        delete requestHandlers[method];
                    }
                    else {
                        starRequestHandler = undefined;
                    }
                }
            };
        },
        trace: (_value, _tracer, sendNotificationOrTraceOptions) => {
            let _sendNotification = false;
            let _traceFormat = TraceFormat.Text;
            if (sendNotificationOrTraceOptions !== undefined) {
                if (is$2.boolean(sendNotificationOrTraceOptions)) {
                    _sendNotification = sendNotificationOrTraceOptions;
                }
                else {
                    _sendNotification = sendNotificationOrTraceOptions.sendNotification || false;
                    _traceFormat = sendNotificationOrTraceOptions.traceFormat || TraceFormat.Text;
                }
            }
            trace = _value;
            traceFormat = _traceFormat;
            if (trace === Trace.Off) {
                tracer = undefined;
            }
            else {
                tracer = _tracer;
            }
            if (_sendNotification && !isClosed() && !isDisposed()) {
                connection.sendNotification(SetTraceNotification.type, { value: Trace.toString(_value) });
            }
        },
        onError: errorEmitter.event,
        onClose: closeEmitter.event,
        onUnhandledNotification: unhandledNotificationEmitter.event,
        onDispose: disposeEmitter.event,
        end: () => {
            messageWriter.end();
        },
        dispose: () => {
            if (isDisposed()) {
                return;
            }
            state = ConnectionState.Disposed;
            disposeEmitter.fire(undefined);
            const error = new Error('Connection got disposed.');
            Object.keys(responsePromises).forEach((key) => {
                responsePromises[key].reject(error);
            });
            responsePromises = Object.create(null);
            requestTokens = Object.create(null);
            knownCanceledRequests = new Set();
            messageQueue = new linkedMap.LinkedMap();
            // Test for backwards compatibility
            if (is$2.func(messageWriter.dispose)) {
                messageWriter.dispose();
            }
            if (is$2.func(messageReader.dispose)) {
                messageReader.dispose();
            }
        },
        listen: () => {
            throwIfClosedOrDisposed();
            throwIfListening();
            state = ConnectionState.Listening;
            messageReader.listen(callback);
        },
        inspect: () => {
            // eslint-disable-next-line no-console
            ral.default().console.log('inspect');
        }
    };
    connection.onNotification(LogTraceNotification.type, (params) => {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        tracer.log(params.message, trace === Trace.Verbose ? params.verbose : undefined);
    });
    connection.onNotification(ProgressNotification.type, (params) => {
        const handler = progressHandlers.get(params.token);
        if (handler) {
            handler(params.value);
        }
        else {
            unhandledProgressEmitter.fire(params);
        }
    });
    return connection;
}
exports.createMessageConnection = createMessageConnection;

});

var api$2 = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
/// <reference path="../../typings/thenable.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancellationSenderStrategy = exports.CancellationReceiverStrategy = exports.ConnectionError = exports.ConnectionErrors = exports.LogTraceNotification = exports.SetTraceNotification = exports.TraceFormat = exports.Trace = exports.ProgressType = exports.createMessageConnection = exports.NullLogger = exports.ConnectionOptions = exports.ConnectionStrategy = exports.WriteableStreamMessageWriter = exports.AbstractMessageWriter = exports.MessageWriter = exports.ReadableStreamMessageReader = exports.AbstractMessageReader = exports.MessageReader = exports.CancellationToken = exports.CancellationTokenSource = exports.Emitter = exports.Event = exports.Disposable = exports.ParameterStructures = exports.NotificationType9 = exports.NotificationType8 = exports.NotificationType7 = exports.NotificationType6 = exports.NotificationType5 = exports.NotificationType4 = exports.NotificationType3 = exports.NotificationType2 = exports.NotificationType1 = exports.NotificationType0 = exports.NotificationType = exports.ErrorCodes = exports.ResponseError = exports.RequestType9 = exports.RequestType8 = exports.RequestType7 = exports.RequestType6 = exports.RequestType5 = exports.RequestType4 = exports.RequestType3 = exports.RequestType2 = exports.RequestType1 = exports.RequestType0 = exports.RequestType = exports.RAL = void 0;
exports.CancellationStrategy = void 0;

Object.defineProperty(exports, "RequestType", { enumerable: true, get: function () { return messages$1.RequestType; } });
Object.defineProperty(exports, "RequestType0", { enumerable: true, get: function () { return messages$1.RequestType0; } });
Object.defineProperty(exports, "RequestType1", { enumerable: true, get: function () { return messages$1.RequestType1; } });
Object.defineProperty(exports, "RequestType2", { enumerable: true, get: function () { return messages$1.RequestType2; } });
Object.defineProperty(exports, "RequestType3", { enumerable: true, get: function () { return messages$1.RequestType3; } });
Object.defineProperty(exports, "RequestType4", { enumerable: true, get: function () { return messages$1.RequestType4; } });
Object.defineProperty(exports, "RequestType5", { enumerable: true, get: function () { return messages$1.RequestType5; } });
Object.defineProperty(exports, "RequestType6", { enumerable: true, get: function () { return messages$1.RequestType6; } });
Object.defineProperty(exports, "RequestType7", { enumerable: true, get: function () { return messages$1.RequestType7; } });
Object.defineProperty(exports, "RequestType8", { enumerable: true, get: function () { return messages$1.RequestType8; } });
Object.defineProperty(exports, "RequestType9", { enumerable: true, get: function () { return messages$1.RequestType9; } });
Object.defineProperty(exports, "ResponseError", { enumerable: true, get: function () { return messages$1.ResponseError; } });
Object.defineProperty(exports, "ErrorCodes", { enumerable: true, get: function () { return messages$1.ErrorCodes; } });
Object.defineProperty(exports, "NotificationType", { enumerable: true, get: function () { return messages$1.NotificationType; } });
Object.defineProperty(exports, "NotificationType0", { enumerable: true, get: function () { return messages$1.NotificationType0; } });
Object.defineProperty(exports, "NotificationType1", { enumerable: true, get: function () { return messages$1.NotificationType1; } });
Object.defineProperty(exports, "NotificationType2", { enumerable: true, get: function () { return messages$1.NotificationType2; } });
Object.defineProperty(exports, "NotificationType3", { enumerable: true, get: function () { return messages$1.NotificationType3; } });
Object.defineProperty(exports, "NotificationType4", { enumerable: true, get: function () { return messages$1.NotificationType4; } });
Object.defineProperty(exports, "NotificationType5", { enumerable: true, get: function () { return messages$1.NotificationType5; } });
Object.defineProperty(exports, "NotificationType6", { enumerable: true, get: function () { return messages$1.NotificationType6; } });
Object.defineProperty(exports, "NotificationType7", { enumerable: true, get: function () { return messages$1.NotificationType7; } });
Object.defineProperty(exports, "NotificationType8", { enumerable: true, get: function () { return messages$1.NotificationType8; } });
Object.defineProperty(exports, "NotificationType9", { enumerable: true, get: function () { return messages$1.NotificationType9; } });
Object.defineProperty(exports, "ParameterStructures", { enumerable: true, get: function () { return messages$1.ParameterStructures; } });

Object.defineProperty(exports, "Disposable", { enumerable: true, get: function () { return disposable.Disposable; } });

Object.defineProperty(exports, "Event", { enumerable: true, get: function () { return events.Event; } });
Object.defineProperty(exports, "Emitter", { enumerable: true, get: function () { return events.Emitter; } });

Object.defineProperty(exports, "CancellationTokenSource", { enumerable: true, get: function () { return cancellation.CancellationTokenSource; } });
Object.defineProperty(exports, "CancellationToken", { enumerable: true, get: function () { return cancellation.CancellationToken; } });

Object.defineProperty(exports, "MessageReader", { enumerable: true, get: function () { return messageReader$1.MessageReader; } });
Object.defineProperty(exports, "AbstractMessageReader", { enumerable: true, get: function () { return messageReader$1.AbstractMessageReader; } });
Object.defineProperty(exports, "ReadableStreamMessageReader", { enumerable: true, get: function () { return messageReader$1.ReadableStreamMessageReader; } });

Object.defineProperty(exports, "MessageWriter", { enumerable: true, get: function () { return messageWriter$1.MessageWriter; } });
Object.defineProperty(exports, "AbstractMessageWriter", { enumerable: true, get: function () { return messageWriter$1.AbstractMessageWriter; } });
Object.defineProperty(exports, "WriteableStreamMessageWriter", { enumerable: true, get: function () { return messageWriter$1.WriteableStreamMessageWriter; } });

Object.defineProperty(exports, "ConnectionStrategy", { enumerable: true, get: function () { return connection$2.ConnectionStrategy; } });
Object.defineProperty(exports, "ConnectionOptions", { enumerable: true, get: function () { return connection$2.ConnectionOptions; } });
Object.defineProperty(exports, "NullLogger", { enumerable: true, get: function () { return connection$2.NullLogger; } });
Object.defineProperty(exports, "createMessageConnection", { enumerable: true, get: function () { return connection$2.createMessageConnection; } });
Object.defineProperty(exports, "ProgressType", { enumerable: true, get: function () { return connection$2.ProgressType; } });
Object.defineProperty(exports, "Trace", { enumerable: true, get: function () { return connection$2.Trace; } });
Object.defineProperty(exports, "TraceFormat", { enumerable: true, get: function () { return connection$2.TraceFormat; } });
Object.defineProperty(exports, "SetTraceNotification", { enumerable: true, get: function () { return connection$2.SetTraceNotification; } });
Object.defineProperty(exports, "LogTraceNotification", { enumerable: true, get: function () { return connection$2.LogTraceNotification; } });
Object.defineProperty(exports, "ConnectionErrors", { enumerable: true, get: function () { return connection$2.ConnectionErrors; } });
Object.defineProperty(exports, "ConnectionError", { enumerable: true, get: function () { return connection$2.ConnectionError; } });
Object.defineProperty(exports, "CancellationReceiverStrategy", { enumerable: true, get: function () { return connection$2.CancellationReceiverStrategy; } });
Object.defineProperty(exports, "CancellationSenderStrategy", { enumerable: true, get: function () { return connection$2.CancellationSenderStrategy; } });
Object.defineProperty(exports, "CancellationStrategy", { enumerable: true, get: function () { return connection$2.CancellationStrategy; } });

exports.RAL = ral.default;

});

var main$3 = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageConnection = exports.BrowserMessageWriter = exports.BrowserMessageReader = void 0;

// Install the browser runtime abstract.
ril.default.install();

__exportStar(api$2, exports);
class BrowserMessageReader extends api$2.AbstractMessageReader {
    constructor(context) {
        super();
        this._onData = new api$2.Emitter();
        this._messageListener = (event) => {
            this._onData.fire(event.data);
        };
        context.addEventListener('error', (event) => this.fireError(event));
        context.onmessage = this._messageListener;
    }
    listen(callback) {
        return this._onData.event(callback);
    }
}
exports.BrowserMessageReader = BrowserMessageReader;
class BrowserMessageWriter extends api$2.AbstractMessageWriter {
    constructor(context) {
        super();
        this.context = context;
        this.errorCount = 0;
        context.addEventListener('error', (event) => this.fireError(event));
    }
    write(msg) {
        try {
            this.context.postMessage(msg);
            return Promise.resolve();
        }
        catch (error) {
            this.handleError(error, msg);
            return Promise.reject(error);
        }
    }
    handleError(error, msg) {
        this.errorCount++;
        this.fireError(error, msg, this.errorCount);
    }
    end() {
    }
}
exports.BrowserMessageWriter = BrowserMessageWriter;
function createMessageConnection(reader, writer, logger, options) {
    if (logger === undefined) {
        logger = api$2.NullLogger;
    }
    if (api$2.ConnectionStrategy.is(options)) {
        options = { connectionStrategy: options };
    }
    return api$2.createMessageConnection(reader, writer, logger, options);
}
exports.createMessageConnection = createMessageConnection;

});

var browser$2 = main$3;

/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
var integer;
(function (integer) {
    integer.MIN_VALUE = -2147483648;
    integer.MAX_VALUE = 2147483647;
})(integer || (integer = {}));
var uinteger;
(function (uinteger) {
    uinteger.MIN_VALUE = 0;
    uinteger.MAX_VALUE = 2147483647;
})(uinteger || (uinteger = {}));
/**
 * The Position namespace provides helper functions to work with
 * [Position](#Position) literals.
 */
var Position;
(function (Position) {
    /**
     * Creates a new Position literal from the given line and character.
     * @param line The position's line.
     * @param character The position's character.
     */
    function create(line, character) {
        if (line === Number.MAX_VALUE) {
            line = uinteger.MAX_VALUE;
        }
        if (character === Number.MAX_VALUE) {
            character = uinteger.MAX_VALUE;
        }
        return { line: line, character: character };
    }
    Position.create = create;
    /**
     * Checks whether the given literal conforms to the [Position](#Position) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Is.uinteger(candidate.line) && Is.uinteger(candidate.character);
    }
    Position.is = is;
})(Position || (Position = {}));
/**
 * The Range namespace provides helper functions to work with
 * [Range](#Range) literals.
 */
var Range;
(function (Range) {
    function create(one, two, three, four) {
        if (Is.uinteger(one) && Is.uinteger(two) && Is.uinteger(three) && Is.uinteger(four)) {
            return { start: Position.create(one, two), end: Position.create(three, four) };
        }
        else if (Position.is(one) && Position.is(two)) {
            return { start: one, end: two };
        }
        else {
            throw new Error("Range#create called with invalid arguments[" + one + ", " + two + ", " + three + ", " + four + "]");
        }
    }
    Range.create = create;
    /**
     * Checks whether the given literal conforms to the [Range](#Range) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
    }
    Range.is = is;
})(Range || (Range = {}));
/**
 * The Location namespace provides helper functions to work with
 * [Location](#Location) literals.
 */
var Location;
(function (Location) {
    /**
     * Creates a Location literal.
     * @param uri The location's uri.
     * @param range The location's range.
     */
    function create(uri, range) {
        return { uri: uri, range: range };
    }
    Location.create = create;
    /**
     * Checks whether the given literal conforms to the [Location](#Location) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.string(candidate.uri) || Is.undefined(candidate.uri));
    }
    Location.is = is;
})(Location || (Location = {}));
/**
 * The LocationLink namespace provides helper functions to work with
 * [LocationLink](#LocationLink) literals.
 */
var LocationLink;
(function (LocationLink) {
    /**
     * Creates a LocationLink literal.
     * @param targetUri The definition's uri.
     * @param targetRange The full range of the definition.
     * @param targetSelectionRange The span of the symbol definition at the target.
     * @param originSelectionRange The span of the symbol being defined in the originating source file.
     */
    function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
        return { targetUri: targetUri, targetRange: targetRange, targetSelectionRange: targetSelectionRange, originSelectionRange: originSelectionRange };
    }
    LocationLink.create = create;
    /**
     * Checks whether the given literal conforms to the [LocationLink](#LocationLink) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.targetRange) && Is.string(candidate.targetUri)
            && (Range.is(candidate.targetSelectionRange) || Is.undefined(candidate.targetSelectionRange))
            && (Range.is(candidate.originSelectionRange) || Is.undefined(candidate.originSelectionRange));
    }
    LocationLink.is = is;
})(LocationLink || (LocationLink = {}));
/**
 * The Color namespace provides helper functions to work with
 * [Color](#Color) literals.
 */
var Color;
(function (Color) {
    /**
     * Creates a new Color literal.
     */
    function create(red, green, blue, alpha) {
        return {
            red: red,
            green: green,
            blue: blue,
            alpha: alpha,
        };
    }
    Color.create = create;
    /**
     * Checks whether the given literal conforms to the [Color](#Color) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.numberRange(candidate.red, 0, 1)
            && Is.numberRange(candidate.green, 0, 1)
            && Is.numberRange(candidate.blue, 0, 1)
            && Is.numberRange(candidate.alpha, 0, 1);
    }
    Color.is = is;
})(Color || (Color = {}));
/**
 * The ColorInformation namespace provides helper functions to work with
 * [ColorInformation](#ColorInformation) literals.
 */
var ColorInformation;
(function (ColorInformation) {
    /**
     * Creates a new ColorInformation literal.
     */
    function create(range, color) {
        return {
            range: range,
            color: color,
        };
    }
    ColorInformation.create = create;
    /**
     * Checks whether the given literal conforms to the [ColorInformation](#ColorInformation) interface.
     */
    function is(value) {
        var candidate = value;
        return Range.is(candidate.range) && Color.is(candidate.color);
    }
    ColorInformation.is = is;
})(ColorInformation || (ColorInformation = {}));
/**
 * The Color namespace provides helper functions to work with
 * [ColorPresentation](#ColorPresentation) literals.
 */
var ColorPresentation;
(function (ColorPresentation) {
    /**
     * Creates a new ColorInformation literal.
     */
    function create(label, textEdit, additionalTextEdits) {
        return {
            label: label,
            textEdit: textEdit,
            additionalTextEdits: additionalTextEdits,
        };
    }
    ColorPresentation.create = create;
    /**
     * Checks whether the given literal conforms to the [ColorInformation](#ColorInformation) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.string(candidate.label)
            && (Is.undefined(candidate.textEdit) || TextEdit.is(candidate))
            && (Is.undefined(candidate.additionalTextEdits) || Is.typedArray(candidate.additionalTextEdits, TextEdit.is));
    }
    ColorPresentation.is = is;
})(ColorPresentation || (ColorPresentation = {}));
/**
 * Enum of known range kinds
 */
var FoldingRangeKind;
(function (FoldingRangeKind) {
    /**
     * Folding range for a comment
     */
    FoldingRangeKind["Comment"] = "comment";
    /**
     * Folding range for a imports or includes
     */
    FoldingRangeKind["Imports"] = "imports";
    /**
     * Folding range for a region (e.g. `#region`)
     */
    FoldingRangeKind["Region"] = "region";
})(FoldingRangeKind || (FoldingRangeKind = {}));
/**
 * The folding range namespace provides helper functions to work with
 * [FoldingRange](#FoldingRange) literals.
 */
var FoldingRange;
(function (FoldingRange) {
    /**
     * Creates a new FoldingRange literal.
     */
    function create(startLine, endLine, startCharacter, endCharacter, kind) {
        var result = {
            startLine: startLine,
            endLine: endLine
        };
        if (Is.defined(startCharacter)) {
            result.startCharacter = startCharacter;
        }
        if (Is.defined(endCharacter)) {
            result.endCharacter = endCharacter;
        }
        if (Is.defined(kind)) {
            result.kind = kind;
        }
        return result;
    }
    FoldingRange.create = create;
    /**
     * Checks whether the given literal conforms to the [FoldingRange](#FoldingRange) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.uinteger(candidate.startLine) && Is.uinteger(candidate.startLine)
            && (Is.undefined(candidate.startCharacter) || Is.uinteger(candidate.startCharacter))
            && (Is.undefined(candidate.endCharacter) || Is.uinteger(candidate.endCharacter))
            && (Is.undefined(candidate.kind) || Is.string(candidate.kind));
    }
    FoldingRange.is = is;
})(FoldingRange || (FoldingRange = {}));
/**
 * The DiagnosticRelatedInformation namespace provides helper functions to work with
 * [DiagnosticRelatedInformation](#DiagnosticRelatedInformation) literals.
 */
var DiagnosticRelatedInformation;
(function (DiagnosticRelatedInformation) {
    /**
     * Creates a new DiagnosticRelatedInformation literal.
     */
    function create(location, message) {
        return {
            location: location,
            message: message
        };
    }
    DiagnosticRelatedInformation.create = create;
    /**
     * Checks whether the given literal conforms to the [DiagnosticRelatedInformation](#DiagnosticRelatedInformation) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Location.is(candidate.location) && Is.string(candidate.message);
    }
    DiagnosticRelatedInformation.is = is;
})(DiagnosticRelatedInformation || (DiagnosticRelatedInformation = {}));
/**
 * The diagnostic's severity.
 */
var DiagnosticSeverity;
(function (DiagnosticSeverity) {
    /**
     * Reports an error.
     */
    DiagnosticSeverity.Error = 1;
    /**
     * Reports a warning.
     */
    DiagnosticSeverity.Warning = 2;
    /**
     * Reports an information.
     */
    DiagnosticSeverity.Information = 3;
    /**
     * Reports a hint.
     */
    DiagnosticSeverity.Hint = 4;
})(DiagnosticSeverity || (DiagnosticSeverity = {}));
/**
 * The diagnostic tags.
 *
 * @since 3.15.0
 */
var DiagnosticTag;
(function (DiagnosticTag) {
    /**
     * Unused or unnecessary code.
     *
     * Clients are allowed to render diagnostics with this tag faded out instead of having
     * an error squiggle.
     */
    DiagnosticTag.Unnecessary = 1;
    /**
     * Deprecated or obsolete code.
     *
     * Clients are allowed to rendered diagnostics with this tag strike through.
     */
    DiagnosticTag.Deprecated = 2;
})(DiagnosticTag || (DiagnosticTag = {}));
/**
 * The CodeDescription namespace provides functions to deal with descriptions for diagnostic codes.
 *
 * @since 3.16.0
 */
var CodeDescription;
(function (CodeDescription) {
    function is(value) {
        var candidate = value;
        return candidate !== undefined && candidate !== null && Is.string(candidate.href);
    }
    CodeDescription.is = is;
})(CodeDescription || (CodeDescription = {}));
/**
 * The Diagnostic namespace provides helper functions to work with
 * [Diagnostic](#Diagnostic) literals.
 */
var Diagnostic;
(function (Diagnostic) {
    /**
     * Creates a new Diagnostic literal.
     */
    function create(range, message, severity, code, source, relatedInformation) {
        var result = { range: range, message: message };
        if (Is.defined(severity)) {
            result.severity = severity;
        }
        if (Is.defined(code)) {
            result.code = code;
        }
        if (Is.defined(source)) {
            result.source = source;
        }
        if (Is.defined(relatedInformation)) {
            result.relatedInformation = relatedInformation;
        }
        return result;
    }
    Diagnostic.create = create;
    /**
     * Checks whether the given literal conforms to the [Diagnostic](#Diagnostic) interface.
     */
    function is(value) {
        var _a;
        var candidate = value;
        return Is.defined(candidate)
            && Range.is(candidate.range)
            && Is.string(candidate.message)
            && (Is.number(candidate.severity) || Is.undefined(candidate.severity))
            && (Is.integer(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code))
            && (Is.undefined(candidate.codeDescription) || (Is.string((_a = candidate.codeDescription) === null || _a === void 0 ? void 0 : _a.href)))
            && (Is.string(candidate.source) || Is.undefined(candidate.source))
            && (Is.undefined(candidate.relatedInformation) || Is.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is));
    }
    Diagnostic.is = is;
})(Diagnostic || (Diagnostic = {}));
/**
 * The Command namespace provides helper functions to work with
 * [Command](#Command) literals.
 */
var Command;
(function (Command) {
    /**
     * Creates a new Command literal.
     */
    function create(title, command) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var result = { title: title, command: command };
        if (Is.defined(args) && args.length > 0) {
            result.arguments = args;
        }
        return result;
    }
    Command.create = create;
    /**
     * Checks whether the given literal conforms to the [Command](#Command) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.command);
    }
    Command.is = is;
})(Command || (Command = {}));
/**
 * The TextEdit namespace provides helper function to create replace,
 * insert and delete edits more easily.
 */
var TextEdit;
(function (TextEdit) {
    /**
     * Creates a replace text edit.
     * @param range The range of text to be replaced.
     * @param newText The new text.
     */
    function replace(range, newText) {
        return { range: range, newText: newText };
    }
    TextEdit.replace = replace;
    /**
     * Creates a insert text edit.
     * @param position The position to insert the text at.
     * @param newText The text to be inserted.
     */
    function insert(position, newText) {
        return { range: { start: position, end: position }, newText: newText };
    }
    TextEdit.insert = insert;
    /**
     * Creates a delete text edit.
     * @param range The range of text to be deleted.
     */
    function del(range) {
        return { range: range, newText: '' };
    }
    TextEdit.del = del;
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate)
            && Is.string(candidate.newText)
            && Range.is(candidate.range);
    }
    TextEdit.is = is;
})(TextEdit || (TextEdit = {}));
var ChangeAnnotation;
(function (ChangeAnnotation) {
    function create(label, needsConfirmation, description) {
        var result = { label: label };
        if (needsConfirmation !== undefined) {
            result.needsConfirmation = needsConfirmation;
        }
        if (description !== undefined) {
            result.description = description;
        }
        return result;
    }
    ChangeAnnotation.create = create;
    function is(value) {
        var candidate = value;
        return candidate !== undefined && Is.objectLiteral(candidate) && Is.string(candidate.label) &&
            (Is.boolean(candidate.needsConfirmation) || candidate.needsConfirmation === undefined) &&
            (Is.string(candidate.description) || candidate.description === undefined);
    }
    ChangeAnnotation.is = is;
})(ChangeAnnotation || (ChangeAnnotation = {}));
var ChangeAnnotationIdentifier;
(function (ChangeAnnotationIdentifier) {
    function is(value) {
        var candidate = value;
        return typeof candidate === 'string';
    }
    ChangeAnnotationIdentifier.is = is;
})(ChangeAnnotationIdentifier || (ChangeAnnotationIdentifier = {}));
var AnnotatedTextEdit;
(function (AnnotatedTextEdit) {
    /**
     * Creates an annotated replace text edit.
     *
     * @param range The range of text to be replaced.
     * @param newText The new text.
     * @param annotation The annotation.
     */
    function replace(range, newText, annotation) {
        return { range: range, newText: newText, annotationId: annotation };
    }
    AnnotatedTextEdit.replace = replace;
    /**
     * Creates an annotated insert text edit.
     *
     * @param position The position to insert the text at.
     * @param newText The text to be inserted.
     * @param annotation The annotation.
     */
    function insert(position, newText, annotation) {
        return { range: { start: position, end: position }, newText: newText, annotationId: annotation };
    }
    AnnotatedTextEdit.insert = insert;
    /**
     * Creates an annotated delete text edit.
     *
     * @param range The range of text to be deleted.
     * @param annotation The annotation.
     */
    function del(range, annotation) {
        return { range: range, newText: '', annotationId: annotation };
    }
    AnnotatedTextEdit.del = del;
    function is(value) {
        var candidate = value;
        return TextEdit.is(candidate) && (ChangeAnnotation.is(candidate.annotationId) || ChangeAnnotationIdentifier.is(candidate.annotationId));
    }
    AnnotatedTextEdit.is = is;
})(AnnotatedTextEdit || (AnnotatedTextEdit = {}));
/**
 * The TextDocumentEdit namespace provides helper function to create
 * an edit that manipulates a text document.
 */
var TextDocumentEdit;
(function (TextDocumentEdit) {
    /**
     * Creates a new `TextDocumentEdit`
     */
    function create(textDocument, edits) {
        return { textDocument: textDocument, edits: edits };
    }
    TextDocumentEdit.create = create;
    function is(value) {
        var candidate = value;
        return Is.defined(candidate)
            && OptionalVersionedTextDocumentIdentifier.is(candidate.textDocument)
            && Array.isArray(candidate.edits);
    }
    TextDocumentEdit.is = is;
})(TextDocumentEdit || (TextDocumentEdit = {}));
var CreateFile;
(function (CreateFile) {
    function create(uri, options, annotation) {
        var result = {
            kind: 'create',
            uri: uri
        };
        if (options !== undefined && (options.overwrite !== undefined || options.ignoreIfExists !== undefined)) {
            result.options = options;
        }
        if (annotation !== undefined) {
            result.annotationId = annotation;
        }
        return result;
    }
    CreateFile.create = create;
    function is(value) {
        var candidate = value;
        return candidate && candidate.kind === 'create' && Is.string(candidate.uri) && (candidate.options === undefined ||
            ((candidate.options.overwrite === undefined || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === undefined || Is.boolean(candidate.options.ignoreIfExists)))) && (candidate.annotationId === undefined || ChangeAnnotationIdentifier.is(candidate.annotationId));
    }
    CreateFile.is = is;
})(CreateFile || (CreateFile = {}));
var RenameFile;
(function (RenameFile) {
    function create(oldUri, newUri, options, annotation) {
        var result = {
            kind: 'rename',
            oldUri: oldUri,
            newUri: newUri
        };
        if (options !== undefined && (options.overwrite !== undefined || options.ignoreIfExists !== undefined)) {
            result.options = options;
        }
        if (annotation !== undefined) {
            result.annotationId = annotation;
        }
        return result;
    }
    RenameFile.create = create;
    function is(value) {
        var candidate = value;
        return candidate && candidate.kind === 'rename' && Is.string(candidate.oldUri) && Is.string(candidate.newUri) && (candidate.options === undefined ||
            ((candidate.options.overwrite === undefined || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === undefined || Is.boolean(candidate.options.ignoreIfExists)))) && (candidate.annotationId === undefined || ChangeAnnotationIdentifier.is(candidate.annotationId));
    }
    RenameFile.is = is;
})(RenameFile || (RenameFile = {}));
var DeleteFile;
(function (DeleteFile) {
    function create(uri, options, annotation) {
        var result = {
            kind: 'delete',
            uri: uri
        };
        if (options !== undefined && (options.recursive !== undefined || options.ignoreIfNotExists !== undefined)) {
            result.options = options;
        }
        if (annotation !== undefined) {
            result.annotationId = annotation;
        }
        return result;
    }
    DeleteFile.create = create;
    function is(value) {
        var candidate = value;
        return candidate && candidate.kind === 'delete' && Is.string(candidate.uri) && (candidate.options === undefined ||
            ((candidate.options.recursive === undefined || Is.boolean(candidate.options.recursive)) && (candidate.options.ignoreIfNotExists === undefined || Is.boolean(candidate.options.ignoreIfNotExists)))) && (candidate.annotationId === undefined || ChangeAnnotationIdentifier.is(candidate.annotationId));
    }
    DeleteFile.is = is;
})(DeleteFile || (DeleteFile = {}));
var WorkspaceEdit;
(function (WorkspaceEdit) {
    function is(value) {
        var candidate = value;
        return candidate &&
            (candidate.changes !== undefined || candidate.documentChanges !== undefined) &&
            (candidate.documentChanges === undefined || candidate.documentChanges.every(function (change) {
                if (Is.string(change.kind)) {
                    return CreateFile.is(change) || RenameFile.is(change) || DeleteFile.is(change);
                }
                else {
                    return TextDocumentEdit.is(change);
                }
            }));
    }
    WorkspaceEdit.is = is;
})(WorkspaceEdit || (WorkspaceEdit = {}));
var TextEditChangeImpl = /** @class */ (function () {
    function TextEditChangeImpl(edits, changeAnnotations) {
        this.edits = edits;
        this.changeAnnotations = changeAnnotations;
    }
    TextEditChangeImpl.prototype.insert = function (position, newText, annotation) {
        var edit;
        var id;
        if (annotation === undefined) {
            edit = TextEdit.insert(position, newText);
        }
        else if (ChangeAnnotationIdentifier.is(annotation)) {
            id = annotation;
            edit = AnnotatedTextEdit.insert(position, newText, annotation);
        }
        else {
            this.assertChangeAnnotations(this.changeAnnotations);
            id = this.changeAnnotations.manage(annotation);
            edit = AnnotatedTextEdit.insert(position, newText, id);
        }
        this.edits.push(edit);
        if (id !== undefined) {
            return id;
        }
    };
    TextEditChangeImpl.prototype.replace = function (range, newText, annotation) {
        var edit;
        var id;
        if (annotation === undefined) {
            edit = TextEdit.replace(range, newText);
        }
        else if (ChangeAnnotationIdentifier.is(annotation)) {
            id = annotation;
            edit = AnnotatedTextEdit.replace(range, newText, annotation);
        }
        else {
            this.assertChangeAnnotations(this.changeAnnotations);
            id = this.changeAnnotations.manage(annotation);
            edit = AnnotatedTextEdit.replace(range, newText, id);
        }
        this.edits.push(edit);
        if (id !== undefined) {
            return id;
        }
    };
    TextEditChangeImpl.prototype.delete = function (range, annotation) {
        var edit;
        var id;
        if (annotation === undefined) {
            edit = TextEdit.del(range);
        }
        else if (ChangeAnnotationIdentifier.is(annotation)) {
            id = annotation;
            edit = AnnotatedTextEdit.del(range, annotation);
        }
        else {
            this.assertChangeAnnotations(this.changeAnnotations);
            id = this.changeAnnotations.manage(annotation);
            edit = AnnotatedTextEdit.del(range, id);
        }
        this.edits.push(edit);
        if (id !== undefined) {
            return id;
        }
    };
    TextEditChangeImpl.prototype.add = function (edit) {
        this.edits.push(edit);
    };
    TextEditChangeImpl.prototype.all = function () {
        return this.edits;
    };
    TextEditChangeImpl.prototype.clear = function () {
        this.edits.splice(0, this.edits.length);
    };
    TextEditChangeImpl.prototype.assertChangeAnnotations = function (value) {
        if (value === undefined) {
            throw new Error("Text edit change is not configured to manage change annotations.");
        }
    };
    return TextEditChangeImpl;
}());
/**
 * A helper class
 */
var ChangeAnnotations = /** @class */ (function () {
    function ChangeAnnotations(annotations) {
        this._annotations = annotations === undefined ? Object.create(null) : annotations;
        this._counter = 0;
        this._size = 0;
    }
    ChangeAnnotations.prototype.all = function () {
        return this._annotations;
    };
    Object.defineProperty(ChangeAnnotations.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: false,
        configurable: true
    });
    ChangeAnnotations.prototype.manage = function (idOrAnnotation, annotation) {
        var id;
        if (ChangeAnnotationIdentifier.is(idOrAnnotation)) {
            id = idOrAnnotation;
        }
        else {
            id = this.nextId();
            annotation = idOrAnnotation;
        }
        if (this._annotations[id] !== undefined) {
            throw new Error("Id " + id + " is already in use.");
        }
        if (annotation === undefined) {
            throw new Error("No annotation provided for id " + id);
        }
        this._annotations[id] = annotation;
        this._size++;
        return id;
    };
    ChangeAnnotations.prototype.nextId = function () {
        this._counter++;
        return this._counter.toString();
    };
    return ChangeAnnotations;
}());
/**
 * A workspace change helps constructing changes to a workspace.
 */
var WorkspaceChange = /** @class */ (function () {
    function WorkspaceChange(workspaceEdit) {
        var _this = this;
        this._textEditChanges = Object.create(null);
        if (workspaceEdit !== undefined) {
            this._workspaceEdit = workspaceEdit;
            if (workspaceEdit.documentChanges) {
                this._changeAnnotations = new ChangeAnnotations(workspaceEdit.changeAnnotations);
                workspaceEdit.changeAnnotations = this._changeAnnotations.all();
                workspaceEdit.documentChanges.forEach(function (change) {
                    if (TextDocumentEdit.is(change)) {
                        var textEditChange = new TextEditChangeImpl(change.edits, _this._changeAnnotations);
                        _this._textEditChanges[change.textDocument.uri] = textEditChange;
                    }
                });
            }
            else if (workspaceEdit.changes) {
                Object.keys(workspaceEdit.changes).forEach(function (key) {
                    var textEditChange = new TextEditChangeImpl(workspaceEdit.changes[key]);
                    _this._textEditChanges[key] = textEditChange;
                });
            }
        }
        else {
            this._workspaceEdit = {};
        }
    }
    Object.defineProperty(WorkspaceChange.prototype, "edit", {
        /**
         * Returns the underlying [WorkspaceEdit](#WorkspaceEdit) literal
         * use to be returned from a workspace edit operation like rename.
         */
        get: function () {
            this.initDocumentChanges();
            if (this._changeAnnotations !== undefined) {
                if (this._changeAnnotations.size === 0) {
                    this._workspaceEdit.changeAnnotations = undefined;
                }
                else {
                    this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
                }
            }
            return this._workspaceEdit;
        },
        enumerable: false,
        configurable: true
    });
    WorkspaceChange.prototype.getTextEditChange = function (key) {
        if (OptionalVersionedTextDocumentIdentifier.is(key)) {
            this.initDocumentChanges();
            if (this._workspaceEdit.documentChanges === undefined) {
                throw new Error('Workspace edit is not configured for document changes.');
            }
            var textDocument = { uri: key.uri, version: key.version };
            var result = this._textEditChanges[textDocument.uri];
            if (!result) {
                var edits = [];
                var textDocumentEdit = {
                    textDocument: textDocument,
                    edits: edits
                };
                this._workspaceEdit.documentChanges.push(textDocumentEdit);
                result = new TextEditChangeImpl(edits, this._changeAnnotations);
                this._textEditChanges[textDocument.uri] = result;
            }
            return result;
        }
        else {
            this.initChanges();
            if (this._workspaceEdit.changes === undefined) {
                throw new Error('Workspace edit is not configured for normal text edit changes.');
            }
            var result = this._textEditChanges[key];
            if (!result) {
                var edits = [];
                this._workspaceEdit.changes[key] = edits;
                result = new TextEditChangeImpl(edits);
                this._textEditChanges[key] = result;
            }
            return result;
        }
    };
    WorkspaceChange.prototype.initDocumentChanges = function () {
        if (this._workspaceEdit.documentChanges === undefined && this._workspaceEdit.changes === undefined) {
            this._changeAnnotations = new ChangeAnnotations();
            this._workspaceEdit.documentChanges = [];
            this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
        }
    };
    WorkspaceChange.prototype.initChanges = function () {
        if (this._workspaceEdit.documentChanges === undefined && this._workspaceEdit.changes === undefined) {
            this._workspaceEdit.changes = Object.create(null);
        }
    };
    WorkspaceChange.prototype.createFile = function (uri, optionsOrAnnotation, options) {
        this.initDocumentChanges();
        if (this._workspaceEdit.documentChanges === undefined) {
            throw new Error('Workspace edit is not configured for document changes.');
        }
        var annotation;
        if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
            annotation = optionsOrAnnotation;
        }
        else {
            options = optionsOrAnnotation;
        }
        var operation;
        var id;
        if (annotation === undefined) {
            operation = CreateFile.create(uri, options);
        }
        else {
            id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
            operation = CreateFile.create(uri, options, id);
        }
        this._workspaceEdit.documentChanges.push(operation);
        if (id !== undefined) {
            return id;
        }
    };
    WorkspaceChange.prototype.renameFile = function (oldUri, newUri, optionsOrAnnotation, options) {
        this.initDocumentChanges();
        if (this._workspaceEdit.documentChanges === undefined) {
            throw new Error('Workspace edit is not configured for document changes.');
        }
        var annotation;
        if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
            annotation = optionsOrAnnotation;
        }
        else {
            options = optionsOrAnnotation;
        }
        var operation;
        var id;
        if (annotation === undefined) {
            operation = RenameFile.create(oldUri, newUri, options);
        }
        else {
            id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
            operation = RenameFile.create(oldUri, newUri, options, id);
        }
        this._workspaceEdit.documentChanges.push(operation);
        if (id !== undefined) {
            return id;
        }
    };
    WorkspaceChange.prototype.deleteFile = function (uri, optionsOrAnnotation, options) {
        this.initDocumentChanges();
        if (this._workspaceEdit.documentChanges === undefined) {
            throw new Error('Workspace edit is not configured for document changes.');
        }
        var annotation;
        if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
            annotation = optionsOrAnnotation;
        }
        else {
            options = optionsOrAnnotation;
        }
        var operation;
        var id;
        if (annotation === undefined) {
            operation = DeleteFile.create(uri, options);
        }
        else {
            id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
            operation = DeleteFile.create(uri, options, id);
        }
        this._workspaceEdit.documentChanges.push(operation);
        if (id !== undefined) {
            return id;
        }
    };
    return WorkspaceChange;
}());
/**
 * The TextDocumentIdentifier namespace provides helper functions to work with
 * [TextDocumentIdentifier](#TextDocumentIdentifier) literals.
 */
var TextDocumentIdentifier;
(function (TextDocumentIdentifier) {
    /**
     * Creates a new TextDocumentIdentifier literal.
     * @param uri The document's uri.
     */
    function create(uri) {
        return { uri: uri };
    }
    TextDocumentIdentifier.create = create;
    /**
     * Checks whether the given literal conforms to the [TextDocumentIdentifier](#TextDocumentIdentifier) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri);
    }
    TextDocumentIdentifier.is = is;
})(TextDocumentIdentifier || (TextDocumentIdentifier = {}));
/**
 * The VersionedTextDocumentIdentifier namespace provides helper functions to work with
 * [VersionedTextDocumentIdentifier](#VersionedTextDocumentIdentifier) literals.
 */
var VersionedTextDocumentIdentifier;
(function (VersionedTextDocumentIdentifier) {
    /**
     * Creates a new VersionedTextDocumentIdentifier literal.
     * @param uri The document's uri.
     * @param uri The document's text.
     */
    function create(uri, version) {
        return { uri: uri, version: version };
    }
    VersionedTextDocumentIdentifier.create = create;
    /**
     * Checks whether the given literal conforms to the [VersionedTextDocumentIdentifier](#VersionedTextDocumentIdentifier) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && Is.integer(candidate.version);
    }
    VersionedTextDocumentIdentifier.is = is;
})(VersionedTextDocumentIdentifier || (VersionedTextDocumentIdentifier = {}));
/**
 * The OptionalVersionedTextDocumentIdentifier namespace provides helper functions to work with
 * [OptionalVersionedTextDocumentIdentifier](#OptionalVersionedTextDocumentIdentifier) literals.
 */
var OptionalVersionedTextDocumentIdentifier;
(function (OptionalVersionedTextDocumentIdentifier) {
    /**
     * Creates a new OptionalVersionedTextDocumentIdentifier literal.
     * @param uri The document's uri.
     * @param uri The document's text.
     */
    function create(uri, version) {
        return { uri: uri, version: version };
    }
    OptionalVersionedTextDocumentIdentifier.create = create;
    /**
     * Checks whether the given literal conforms to the [OptionalVersionedTextDocumentIdentifier](#OptionalVersionedTextDocumentIdentifier) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && (candidate.version === null || Is.integer(candidate.version));
    }
    OptionalVersionedTextDocumentIdentifier.is = is;
})(OptionalVersionedTextDocumentIdentifier || (OptionalVersionedTextDocumentIdentifier = {}));
/**
 * The TextDocumentItem namespace provides helper functions to work with
 * [TextDocumentItem](#TextDocumentItem) literals.
 */
var TextDocumentItem;
(function (TextDocumentItem) {
    /**
     * Creates a new TextDocumentItem literal.
     * @param uri The document's uri.
     * @param languageId The document's language identifier.
     * @param version The document's version number.
     * @param text The document's text.
     */
    function create(uri, languageId, version, text) {
        return { uri: uri, languageId: languageId, version: version, text: text };
    }
    TextDocumentItem.create = create;
    /**
     * Checks whether the given literal conforms to the [TextDocumentItem](#TextDocumentItem) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && Is.string(candidate.languageId) && Is.integer(candidate.version) && Is.string(candidate.text);
    }
    TextDocumentItem.is = is;
})(TextDocumentItem || (TextDocumentItem = {}));
/**
 * Describes the content type that a client supports in various
 * result literals like `Hover`, `ParameterInfo` or `CompletionItem`.
 *
 * Please note that `MarkupKinds` must not start with a `$`. This kinds
 * are reserved for internal usage.
 */
var MarkupKind;
(function (MarkupKind) {
    /**
     * Plain text is supported as a content format
     */
    MarkupKind.PlainText = 'plaintext';
    /**
     * Markdown is supported as a content format
     */
    MarkupKind.Markdown = 'markdown';
})(MarkupKind || (MarkupKind = {}));
(function (MarkupKind) {
    /**
     * Checks whether the given value is a value of the [MarkupKind](#MarkupKind) type.
     */
    function is(value) {
        var candidate = value;
        return candidate === MarkupKind.PlainText || candidate === MarkupKind.Markdown;
    }
    MarkupKind.is = is;
})(MarkupKind || (MarkupKind = {}));
var MarkupContent;
(function (MarkupContent) {
    /**
     * Checks whether the given value conforms to the [MarkupContent](#MarkupContent) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(value) && MarkupKind.is(candidate.kind) && Is.string(candidate.value);
    }
    MarkupContent.is = is;
})(MarkupContent || (MarkupContent = {}));
/**
 * The kind of a completion entry.
 */
var CompletionItemKind;
(function (CompletionItemKind) {
    CompletionItemKind.Text = 1;
    CompletionItemKind.Method = 2;
    CompletionItemKind.Function = 3;
    CompletionItemKind.Constructor = 4;
    CompletionItemKind.Field = 5;
    CompletionItemKind.Variable = 6;
    CompletionItemKind.Class = 7;
    CompletionItemKind.Interface = 8;
    CompletionItemKind.Module = 9;
    CompletionItemKind.Property = 10;
    CompletionItemKind.Unit = 11;
    CompletionItemKind.Value = 12;
    CompletionItemKind.Enum = 13;
    CompletionItemKind.Keyword = 14;
    CompletionItemKind.Snippet = 15;
    CompletionItemKind.Color = 16;
    CompletionItemKind.File = 17;
    CompletionItemKind.Reference = 18;
    CompletionItemKind.Folder = 19;
    CompletionItemKind.EnumMember = 20;
    CompletionItemKind.Constant = 21;
    CompletionItemKind.Struct = 22;
    CompletionItemKind.Event = 23;
    CompletionItemKind.Operator = 24;
    CompletionItemKind.TypeParameter = 25;
})(CompletionItemKind || (CompletionItemKind = {}));
/**
 * Defines whether the insert text in a completion item should be interpreted as
 * plain text or a snippet.
 */
var InsertTextFormat;
(function (InsertTextFormat) {
    /**
     * The primary text to be inserted is treated as a plain string.
     */
    InsertTextFormat.PlainText = 1;
    /**
     * The primary text to be inserted is treated as a snippet.
     *
     * A snippet can define tab stops and placeholders with `$1`, `$2`
     * and `${3:foo}`. `$0` defines the final tab stop, it defaults to
     * the end of the snippet. Placeholders with equal identifiers are linked,
     * that is typing in one will update others too.
     *
     * See also: https://microsoft.github.io/language-server-protocol/specifications/specification-current/#snippet_syntax
     */
    InsertTextFormat.Snippet = 2;
})(InsertTextFormat || (InsertTextFormat = {}));
/**
 * Completion item tags are extra annotations that tweak the rendering of a completion
 * item.
 *
 * @since 3.15.0
 */
var CompletionItemTag;
(function (CompletionItemTag) {
    /**
     * Render a completion as obsolete, usually using a strike-out.
     */
    CompletionItemTag.Deprecated = 1;
})(CompletionItemTag || (CompletionItemTag = {}));
/**
 * The InsertReplaceEdit namespace provides functions to deal with insert / replace edits.
 *
 * @since 3.16.0
 */
var InsertReplaceEdit;
(function (InsertReplaceEdit) {
    /**
     * Creates a new insert / replace edit
     */
    function create(newText, insert, replace) {
        return { newText: newText, insert: insert, replace: replace };
    }
    InsertReplaceEdit.create = create;
    /**
     * Checks whether the given literal conforms to the [InsertReplaceEdit](#InsertReplaceEdit) interface.
     */
    function is(value) {
        var candidate = value;
        return candidate && Is.string(candidate.newText) && Range.is(candidate.insert) && Range.is(candidate.replace);
    }
    InsertReplaceEdit.is = is;
})(InsertReplaceEdit || (InsertReplaceEdit = {}));
/**
 * How whitespace and indentation is handled during completion
 * item insertion.
 *
 * @since 3.16.0
 */
var InsertTextMode;
(function (InsertTextMode) {
    /**
     * The insertion or replace strings is taken as it is. If the
     * value is multi line the lines below the cursor will be
     * inserted using the indentation defined in the string value.
     * The client will not apply any kind of adjustments to the
     * string.
     */
    InsertTextMode.asIs = 1;
    /**
     * The editor adjusts leading whitespace of new lines so that
     * they match the indentation up to the cursor of the line for
     * which the item is accepted.
     *
     * Consider a line like this: <2tabs><cursor><3tabs>foo. Accepting a
     * multi line completion item is indented using 2 tabs and all
     * following lines inserted will be indented using 2 tabs as well.
     */
    InsertTextMode.adjustIndentation = 2;
})(InsertTextMode || (InsertTextMode = {}));
var CompletionItemLabelDetails;
(function (CompletionItemLabelDetails) {
    function is(value) {
        var candidate = value;
        return candidate && (Is.string(candidate.parameters) || candidate.parameters === undefined) &&
            (Is.string(candidate.qualifier) || candidate.qualifier === undefined) && (Is.string(candidate.type) || candidate.type === undefined);
    }
    CompletionItemLabelDetails.is = is;
})(CompletionItemLabelDetails || (CompletionItemLabelDetails = {}));
/**
 * The CompletionItem namespace provides functions to deal with
 * completion items.
 */
var CompletionItem;
(function (CompletionItem) {
    /**
     * Create a completion item and seed it with a label.
     * @param label The completion item's label
     */
    function create(label) {
        return { label: label };
    }
    CompletionItem.create = create;
})(CompletionItem || (CompletionItem = {}));
/**
 * The CompletionList namespace provides functions to deal with
 * completion lists.
 */
var CompletionList;
(function (CompletionList) {
    /**
     * Creates a new completion list.
     *
     * @param items The completion items.
     * @param isIncomplete The list is not complete.
     */
    function create(items, isIncomplete) {
        return { items: items ? items : [], isIncomplete: !!isIncomplete };
    }
    CompletionList.create = create;
})(CompletionList || (CompletionList = {}));
var MarkedString;
(function (MarkedString) {
    /**
     * Creates a marked string from plain text.
     *
     * @param plainText The plain text.
     */
    function fromPlainText(plainText) {
        return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&'); // escape markdown syntax tokens: http://daringfireball.net/projects/markdown/syntax#backslash
    }
    MarkedString.fromPlainText = fromPlainText;
    /**
     * Checks whether the given value conforms to the [MarkedString](#MarkedString) type.
     */
    function is(value) {
        var candidate = value;
        return Is.string(candidate) || (Is.objectLiteral(candidate) && Is.string(candidate.language) && Is.string(candidate.value));
    }
    MarkedString.is = is;
})(MarkedString || (MarkedString = {}));
var Hover;
(function (Hover) {
    /**
     * Checks whether the given value conforms to the [Hover](#Hover) interface.
     */
    function is(value) {
        var candidate = value;
        return !!candidate && Is.objectLiteral(candidate) && (MarkupContent.is(candidate.contents) ||
            MarkedString.is(candidate.contents) ||
            Is.typedArray(candidate.contents, MarkedString.is)) && (value.range === undefined || Range.is(value.range));
    }
    Hover.is = is;
})(Hover || (Hover = {}));
/**
 * The ParameterInformation namespace provides helper functions to work with
 * [ParameterInformation](#ParameterInformation) literals.
 */
var ParameterInformation;
(function (ParameterInformation) {
    /**
     * Creates a new parameter information literal.
     *
     * @param label A label string.
     * @param documentation A doc string.
     */
    function create(label, documentation) {
        return documentation ? { label: label, documentation: documentation } : { label: label };
    }
    ParameterInformation.create = create;
})(ParameterInformation || (ParameterInformation = {}));
/**
 * The SignatureInformation namespace provides helper functions to work with
 * [SignatureInformation](#SignatureInformation) literals.
 */
var SignatureInformation;
(function (SignatureInformation) {
    function create(label, documentation) {
        var parameters = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            parameters[_i - 2] = arguments[_i];
        }
        var result = { label: label };
        if (Is.defined(documentation)) {
            result.documentation = documentation;
        }
        if (Is.defined(parameters)) {
            result.parameters = parameters;
        }
        else {
            result.parameters = [];
        }
        return result;
    }
    SignatureInformation.create = create;
})(SignatureInformation || (SignatureInformation = {}));
/**
 * A document highlight kind.
 */
var DocumentHighlightKind;
(function (DocumentHighlightKind) {
    /**
     * A textual occurrence.
     */
    DocumentHighlightKind.Text = 1;
    /**
     * Read-access of a symbol, like reading a variable.
     */
    DocumentHighlightKind.Read = 2;
    /**
     * Write-access of a symbol, like writing to a variable.
     */
    DocumentHighlightKind.Write = 3;
})(DocumentHighlightKind || (DocumentHighlightKind = {}));
/**
 * DocumentHighlight namespace to provide helper functions to work with
 * [DocumentHighlight](#DocumentHighlight) literals.
 */
var DocumentHighlight;
(function (DocumentHighlight) {
    /**
     * Create a DocumentHighlight object.
     * @param range The range the highlight applies to.
     */
    function create(range, kind) {
        var result = { range: range };
        if (Is.number(kind)) {
            result.kind = kind;
        }
        return result;
    }
    DocumentHighlight.create = create;
})(DocumentHighlight || (DocumentHighlight = {}));
/**
 * A symbol kind.
 */
var SymbolKind;
(function (SymbolKind) {
    SymbolKind.File = 1;
    SymbolKind.Module = 2;
    SymbolKind.Namespace = 3;
    SymbolKind.Package = 4;
    SymbolKind.Class = 5;
    SymbolKind.Method = 6;
    SymbolKind.Property = 7;
    SymbolKind.Field = 8;
    SymbolKind.Constructor = 9;
    SymbolKind.Enum = 10;
    SymbolKind.Interface = 11;
    SymbolKind.Function = 12;
    SymbolKind.Variable = 13;
    SymbolKind.Constant = 14;
    SymbolKind.String = 15;
    SymbolKind.Number = 16;
    SymbolKind.Boolean = 17;
    SymbolKind.Array = 18;
    SymbolKind.Object = 19;
    SymbolKind.Key = 20;
    SymbolKind.Null = 21;
    SymbolKind.EnumMember = 22;
    SymbolKind.Struct = 23;
    SymbolKind.Event = 24;
    SymbolKind.Operator = 25;
    SymbolKind.TypeParameter = 26;
})(SymbolKind || (SymbolKind = {}));
/**
 * Symbol tags are extra annotations that tweak the rendering of a symbol.
 * @since 3.16
 */
var SymbolTag;
(function (SymbolTag) {
    /**
     * Render a symbol as obsolete, usually using a strike-out.
     */
    SymbolTag.Deprecated = 1;
})(SymbolTag || (SymbolTag = {}));
var SymbolInformation;
(function (SymbolInformation) {
    /**
     * Creates a new symbol information literal.
     *
     * @param name The name of the symbol.
     * @param kind The kind of the symbol.
     * @param range The range of the location of the symbol.
     * @param uri The resource of the location of symbol, defaults to the current document.
     * @param containerName The name of the symbol containing the symbol.
     */
    function create(name, kind, range, uri, containerName) {
        var result = {
            name: name,
            kind: kind,
            location: { uri: uri, range: range }
        };
        if (containerName) {
            result.containerName = containerName;
        }
        return result;
    }
    SymbolInformation.create = create;
})(SymbolInformation || (SymbolInformation = {}));
var DocumentSymbol;
(function (DocumentSymbol) {
    /**
     * Creates a new symbol information literal.
     *
     * @param name The name of the symbol.
     * @param detail The detail of the symbol.
     * @param kind The kind of the symbol.
     * @param range The range of the symbol.
     * @param selectionRange The selectionRange of the symbol.
     * @param children Children of the symbol.
     */
    function create(name, detail, kind, range, selectionRange, children) {
        var result = {
            name: name,
            detail: detail,
            kind: kind,
            range: range,
            selectionRange: selectionRange
        };
        if (children !== undefined) {
            result.children = children;
        }
        return result;
    }
    DocumentSymbol.create = create;
    /**
     * Checks whether the given literal conforms to the [DocumentSymbol](#DocumentSymbol) interface.
     */
    function is(value) {
        var candidate = value;
        return candidate &&
            Is.string(candidate.name) && Is.number(candidate.kind) &&
            Range.is(candidate.range) && Range.is(candidate.selectionRange) &&
            (candidate.detail === undefined || Is.string(candidate.detail)) &&
            (candidate.deprecated === undefined || Is.boolean(candidate.deprecated)) &&
            (candidate.children === undefined || Array.isArray(candidate.children)) &&
            (candidate.tags === undefined || Array.isArray(candidate.tags));
    }
    DocumentSymbol.is = is;
})(DocumentSymbol || (DocumentSymbol = {}));
/**
 * A set of predefined code action kinds
 */
var CodeActionKind;
(function (CodeActionKind) {
    /**
     * Empty kind.
     */
    CodeActionKind.Empty = '';
    /**
     * Base kind for quickfix actions: 'quickfix'
     */
    CodeActionKind.QuickFix = 'quickfix';
    /**
     * Base kind for refactoring actions: 'refactor'
     */
    CodeActionKind.Refactor = 'refactor';
    /**
     * Base kind for refactoring extraction actions: 'refactor.extract'
     *
     * Example extract actions:
     *
     * - Extract method
     * - Extract function
     * - Extract variable
     * - Extract interface from class
     * - ...
     */
    CodeActionKind.RefactorExtract = 'refactor.extract';
    /**
     * Base kind for refactoring inline actions: 'refactor.inline'
     *
     * Example inline actions:
     *
     * - Inline function
     * - Inline variable
     * - Inline constant
     * - ...
     */
    CodeActionKind.RefactorInline = 'refactor.inline';
    /**
     * Base kind for refactoring rewrite actions: 'refactor.rewrite'
     *
     * Example rewrite actions:
     *
     * - Convert JavaScript function to class
     * - Add or remove parameter
     * - Encapsulate field
     * - Make method static
     * - Move method to base class
     * - ...
     */
    CodeActionKind.RefactorRewrite = 'refactor.rewrite';
    /**
     * Base kind for source actions: `source`
     *
     * Source code actions apply to the entire file.
     */
    CodeActionKind.Source = 'source';
    /**
     * Base kind for an organize imports source action: `source.organizeImports`
     */
    CodeActionKind.SourceOrganizeImports = 'source.organizeImports';
    /**
     * Base kind for auto-fix source actions: `source.fixAll`.
     *
     * Fix all actions automatically fix errors that have a clear fix that do not require user input.
     * They should not suppress errors or perform unsafe fixes such as generating new types or classes.
     *
     * @since 3.15.0
     */
    CodeActionKind.SourceFixAll = 'source.fixAll';
})(CodeActionKind || (CodeActionKind = {}));
/**
 * The CodeActionContext namespace provides helper functions to work with
 * [CodeActionContext](#CodeActionContext) literals.
 */
var CodeActionContext;
(function (CodeActionContext) {
    /**
     * Creates a new CodeActionContext literal.
     */
    function create(diagnostics, only) {
        var result = { diagnostics: diagnostics };
        if (only !== undefined && only !== null) {
            result.only = only;
        }
        return result;
    }
    CodeActionContext.create = create;
    /**
     * Checks whether the given literal conforms to the [CodeActionContext](#CodeActionContext) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic.is) && (candidate.only === undefined || Is.typedArray(candidate.only, Is.string));
    }
    CodeActionContext.is = is;
})(CodeActionContext || (CodeActionContext = {}));
var CodeAction;
(function (CodeAction) {
    function create(title, kindOrCommandOrEdit, kind) {
        var result = { title: title };
        var checkKind = true;
        if (typeof kindOrCommandOrEdit === 'string') {
            checkKind = false;
            result.kind = kindOrCommandOrEdit;
        }
        else if (Command.is(kindOrCommandOrEdit)) {
            result.command = kindOrCommandOrEdit;
        }
        else {
            result.edit = kindOrCommandOrEdit;
        }
        if (checkKind && kind !== undefined) {
            result.kind = kind;
        }
        return result;
    }
    CodeAction.create = create;
    function is(value) {
        var candidate = value;
        return candidate && Is.string(candidate.title) &&
            (candidate.diagnostics === undefined || Is.typedArray(candidate.diagnostics, Diagnostic.is)) &&
            (candidate.kind === undefined || Is.string(candidate.kind)) &&
            (candidate.edit !== undefined || candidate.command !== undefined) &&
            (candidate.command === undefined || Command.is(candidate.command)) &&
            (candidate.isPreferred === undefined || Is.boolean(candidate.isPreferred)) &&
            (candidate.edit === undefined || WorkspaceEdit.is(candidate.edit));
    }
    CodeAction.is = is;
})(CodeAction || (CodeAction = {}));
/**
 * The CodeLens namespace provides helper functions to work with
 * [CodeLens](#CodeLens) literals.
 */
var CodeLens;
(function (CodeLens) {
    /**
     * Creates a new CodeLens literal.
     */
    function create(range, data) {
        var result = { range: range };
        if (Is.defined(data)) {
            result.data = data;
        }
        return result;
    }
    CodeLens.create = create;
    /**
     * Checks whether the given literal conforms to the [CodeLens](#CodeLens) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.command) || Command.is(candidate.command));
    }
    CodeLens.is = is;
})(CodeLens || (CodeLens = {}));
/**
 * The FormattingOptions namespace provides helper functions to work with
 * [FormattingOptions](#FormattingOptions) literals.
 */
var FormattingOptions;
(function (FormattingOptions) {
    /**
     * Creates a new FormattingOptions literal.
     */
    function create(tabSize, insertSpaces) {
        return { tabSize: tabSize, insertSpaces: insertSpaces };
    }
    FormattingOptions.create = create;
    /**
     * Checks whether the given literal conforms to the [FormattingOptions](#FormattingOptions) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.uinteger(candidate.tabSize) && Is.boolean(candidate.insertSpaces);
    }
    FormattingOptions.is = is;
})(FormattingOptions || (FormattingOptions = {}));
/**
 * The DocumentLink namespace provides helper functions to work with
 * [DocumentLink](#DocumentLink) literals.
 */
var DocumentLink;
(function (DocumentLink) {
    /**
     * Creates a new DocumentLink literal.
     */
    function create(range, target, data) {
        return { range: range, target: target, data: data };
    }
    DocumentLink.create = create;
    /**
     * Checks whether the given literal conforms to the [DocumentLink](#DocumentLink) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.target) || Is.string(candidate.target));
    }
    DocumentLink.is = is;
})(DocumentLink || (DocumentLink = {}));
/**
 * The SelectionRange namespace provides helper function to work with
 * SelectionRange literals.
 */
var SelectionRange;
(function (SelectionRange) {
    /**
     * Creates a new SelectionRange
     * @param range the range.
     * @param parent an optional parent.
     */
    function create(range, parent) {
        return { range: range, parent: parent };
    }
    SelectionRange.create = create;
    function is(value) {
        var candidate = value;
        return candidate !== undefined && Range.is(candidate.range) && (candidate.parent === undefined || SelectionRange.is(candidate.parent));
    }
    SelectionRange.is = is;
})(SelectionRange || (SelectionRange = {}));
/**
 * A set of predefined token types. This set is not fixed
 * an clients can specify additional token types via the
 * corresponding client capabilities.
 *
 * @since 3.16.0
 */
var SemanticTokenTypes;
(function (SemanticTokenTypes) {
    SemanticTokenTypes["namespace"] = "namespace";
    /**
     * Represents a generic type. Acts as a fallback for types which can't be mapped to
     * a specific type like class or enum.
     */
    SemanticTokenTypes["type"] = "type";
    SemanticTokenTypes["class"] = "class";
    SemanticTokenTypes["enum"] = "enum";
    SemanticTokenTypes["interface"] = "interface";
    SemanticTokenTypes["struct"] = "struct";
    SemanticTokenTypes["typeParameter"] = "typeParameter";
    SemanticTokenTypes["parameter"] = "parameter";
    SemanticTokenTypes["variable"] = "variable";
    SemanticTokenTypes["property"] = "property";
    SemanticTokenTypes["enumMember"] = "enumMember";
    SemanticTokenTypes["event"] = "event";
    SemanticTokenTypes["function"] = "function";
    SemanticTokenTypes["method"] = "method";
    SemanticTokenTypes["macro"] = "macro";
    SemanticTokenTypes["keyword"] = "keyword";
    SemanticTokenTypes["modifier"] = "modifier";
    SemanticTokenTypes["comment"] = "comment";
    SemanticTokenTypes["string"] = "string";
    SemanticTokenTypes["number"] = "number";
    SemanticTokenTypes["regexp"] = "regexp";
    SemanticTokenTypes["operator"] = "operator";
})(SemanticTokenTypes || (SemanticTokenTypes = {}));
/**
 * A set of predefined token modifiers. This set is not fixed
 * an clients can specify additional token types via the
 * corresponding client capabilities.
 *
 * @since 3.16.0
 */
var SemanticTokenModifiers;
(function (SemanticTokenModifiers) {
    SemanticTokenModifiers["declaration"] = "declaration";
    SemanticTokenModifiers["definition"] = "definition";
    SemanticTokenModifiers["readonly"] = "readonly";
    SemanticTokenModifiers["static"] = "static";
    SemanticTokenModifiers["deprecated"] = "deprecated";
    SemanticTokenModifiers["abstract"] = "abstract";
    SemanticTokenModifiers["async"] = "async";
    SemanticTokenModifiers["modification"] = "modification";
    SemanticTokenModifiers["documentation"] = "documentation";
    SemanticTokenModifiers["defaultLibrary"] = "defaultLibrary";
})(SemanticTokenModifiers || (SemanticTokenModifiers = {}));
/**
 * @since 3.16.0
 */
var SemanticTokens;
(function (SemanticTokens) {
    function is(value) {
        var candidate = value;
        return candidate !== undefined && (candidate.resultId === undefined || typeof candidate.resultId === 'string') &&
            Array.isArray(candidate.data) && (candidate.data.length === 0 || typeof candidate.data[0] === 'number');
    }
    SemanticTokens.is = is;
})(SemanticTokens || (SemanticTokens = {}));
var EOL = ['\n', '\r\n', '\r'];
/**
 * @deprecated Use the text document from the new vscode-languageserver-textdocument package.
 */
var TextDocument;
(function (TextDocument) {
    /**
     * Creates a new ITextDocument literal from the given uri and content.
     * @param uri The document's uri.
     * @param languageId  The document's language Id.
     * @param content The document's content.
     */
    function create(uri, languageId, version, content) {
        return new FullTextDocument(uri, languageId, version, content);
    }
    TextDocument.create = create;
    /**
     * Checks whether the given literal conforms to the [ITextDocument](#ITextDocument) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.uinteger(candidate.lineCount)
            && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
    }
    TextDocument.is = is;
    function applyEdits(document, edits) {
        var text = document.getText();
        var sortedEdits = mergeSort(edits, function (a, b) {
            var diff = a.range.start.line - b.range.start.line;
            if (diff === 0) {
                return a.range.start.character - b.range.start.character;
            }
            return diff;
        });
        var lastModifiedOffset = text.length;
        for (var i = sortedEdits.length - 1; i >= 0; i--) {
            var e = sortedEdits[i];
            var startOffset = document.offsetAt(e.range.start);
            var endOffset = document.offsetAt(e.range.end);
            if (endOffset <= lastModifiedOffset) {
                text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
            }
            else {
                throw new Error('Overlapping edit');
            }
            lastModifiedOffset = startOffset;
        }
        return text;
    }
    TextDocument.applyEdits = applyEdits;
    function mergeSort(data, compare) {
        if (data.length <= 1) {
            // sorted
            return data;
        }
        var p = (data.length / 2) | 0;
        var left = data.slice(0, p);
        var right = data.slice(p);
        mergeSort(left, compare);
        mergeSort(right, compare);
        var leftIdx = 0;
        var rightIdx = 0;
        var i = 0;
        while (leftIdx < left.length && rightIdx < right.length) {
            var ret = compare(left[leftIdx], right[rightIdx]);
            if (ret <= 0) {
                // smaller_equal -> take left to preserve order
                data[i++] = left[leftIdx++];
            }
            else {
                // greater -> take right
                data[i++] = right[rightIdx++];
            }
        }
        while (leftIdx < left.length) {
            data[i++] = left[leftIdx++];
        }
        while (rightIdx < right.length) {
            data[i++] = right[rightIdx++];
        }
        return data;
    }
})(TextDocument || (TextDocument = {}));
/**
 * @deprecated Use the text document from the new vscode-languageserver-textdocument package.
 */
var FullTextDocument = /** @class */ (function () {
    function FullTextDocument(uri, languageId, version, content) {
        this._uri = uri;
        this._languageId = languageId;
        this._version = version;
        this._content = content;
        this._lineOffsets = undefined;
    }
    Object.defineProperty(FullTextDocument.prototype, "uri", {
        get: function () {
            return this._uri;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FullTextDocument.prototype, "languageId", {
        get: function () {
            return this._languageId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FullTextDocument.prototype, "version", {
        get: function () {
            return this._version;
        },
        enumerable: false,
        configurable: true
    });
    FullTextDocument.prototype.getText = function (range) {
        if (range) {
            var start = this.offsetAt(range.start);
            var end = this.offsetAt(range.end);
            return this._content.substring(start, end);
        }
        return this._content;
    };
    FullTextDocument.prototype.update = function (event, version) {
        this._content = event.text;
        this._version = version;
        this._lineOffsets = undefined;
    };
    FullTextDocument.prototype.getLineOffsets = function () {
        if (this._lineOffsets === undefined) {
            var lineOffsets = [];
            var text = this._content;
            var isLineStart = true;
            for (var i = 0; i < text.length; i++) {
                if (isLineStart) {
                    lineOffsets.push(i);
                    isLineStart = false;
                }
                var ch = text.charAt(i);
                isLineStart = (ch === '\r' || ch === '\n');
                if (ch === '\r' && i + 1 < text.length && text.charAt(i + 1) === '\n') {
                    i++;
                }
            }
            if (isLineStart && text.length > 0) {
                lineOffsets.push(text.length);
            }
            this._lineOffsets = lineOffsets;
        }
        return this._lineOffsets;
    };
    FullTextDocument.prototype.positionAt = function (offset) {
        offset = Math.max(Math.min(offset, this._content.length), 0);
        var lineOffsets = this.getLineOffsets();
        var low = 0, high = lineOffsets.length;
        if (high === 0) {
            return Position.create(0, offset);
        }
        while (low < high) {
            var mid = Math.floor((low + high) / 2);
            if (lineOffsets[mid] > offset) {
                high = mid;
            }
            else {
                low = mid + 1;
            }
        }
        // low is the least x for which the line offset is larger than the current offset
        // or array.length if no line offset is larger than the current offset
        var line = low - 1;
        return Position.create(line, offset - lineOffsets[line]);
    };
    FullTextDocument.prototype.offsetAt = function (position) {
        var lineOffsets = this.getLineOffsets();
        if (position.line >= lineOffsets.length) {
            return this._content.length;
        }
        else if (position.line < 0) {
            return 0;
        }
        var lineOffset = lineOffsets[position.line];
        var nextLineOffset = (position.line + 1 < lineOffsets.length) ? lineOffsets[position.line + 1] : this._content.length;
        return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
    };
    Object.defineProperty(FullTextDocument.prototype, "lineCount", {
        get: function () {
            return this.getLineOffsets().length;
        },
        enumerable: false,
        configurable: true
    });
    return FullTextDocument;
}());
var Is;
(function (Is) {
    var toString = Object.prototype.toString;
    function defined(value) {
        return typeof value !== 'undefined';
    }
    Is.defined = defined;
    function undefined$1(value) {
        return typeof value === 'undefined';
    }
    Is.undefined = undefined$1;
    function boolean(value) {
        return value === true || value === false;
    }
    Is.boolean = boolean;
    function string(value) {
        return toString.call(value) === '[object String]';
    }
    Is.string = string;
    function number(value) {
        return toString.call(value) === '[object Number]';
    }
    Is.number = number;
    function numberRange(value, min, max) {
        return toString.call(value) === '[object Number]' && min <= value && value <= max;
    }
    Is.numberRange = numberRange;
    function integer(value) {
        return toString.call(value) === '[object Number]' && -2147483648 <= value && value <= 2147483647;
    }
    Is.integer = integer;
    function uinteger(value) {
        return toString.call(value) === '[object Number]' && 0 <= value && value <= 2147483647;
    }
    Is.uinteger = uinteger;
    function func(value) {
        return toString.call(value) === '[object Function]';
    }
    Is.func = func;
    function objectLiteral(value) {
        // Strictly speaking class instances pass this check as well. Since the LSP
        // doesn't use classes we ignore this for now. If we do we need to add something
        // like this: `Object.getPrototypeOf(Object.getPrototypeOf(x)) === null`
        return value !== null && typeof value === 'object';
    }
    Is.objectLiteral = objectLiteral;
    function typedArray(value, check) {
        return Array.isArray(value) && value.every(check);
    }
    Is.typedArray = typedArray;
})(Is || (Is = {}));

var main$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get integer () { return integer; },
    get uinteger () { return uinteger; },
    get Position () { return Position; },
    get Range () { return Range; },
    get Location () { return Location; },
    get LocationLink () { return LocationLink; },
    get Color () { return Color; },
    get ColorInformation () { return ColorInformation; },
    get ColorPresentation () { return ColorPresentation; },
    get FoldingRangeKind () { return FoldingRangeKind; },
    get FoldingRange () { return FoldingRange; },
    get DiagnosticRelatedInformation () { return DiagnosticRelatedInformation; },
    get DiagnosticSeverity () { return DiagnosticSeverity; },
    get DiagnosticTag () { return DiagnosticTag; },
    get CodeDescription () { return CodeDescription; },
    get Diagnostic () { return Diagnostic; },
    get Command () { return Command; },
    get TextEdit () { return TextEdit; },
    get ChangeAnnotation () { return ChangeAnnotation; },
    get ChangeAnnotationIdentifier () { return ChangeAnnotationIdentifier; },
    get AnnotatedTextEdit () { return AnnotatedTextEdit; },
    get TextDocumentEdit () { return TextDocumentEdit; },
    get CreateFile () { return CreateFile; },
    get RenameFile () { return RenameFile; },
    get DeleteFile () { return DeleteFile; },
    get WorkspaceEdit () { return WorkspaceEdit; },
    WorkspaceChange: WorkspaceChange,
    get TextDocumentIdentifier () { return TextDocumentIdentifier; },
    get VersionedTextDocumentIdentifier () { return VersionedTextDocumentIdentifier; },
    get OptionalVersionedTextDocumentIdentifier () { return OptionalVersionedTextDocumentIdentifier; },
    get TextDocumentItem () { return TextDocumentItem; },
    get MarkupKind () { return MarkupKind; },
    get MarkupContent () { return MarkupContent; },
    get CompletionItemKind () { return CompletionItemKind; },
    get InsertTextFormat () { return InsertTextFormat; },
    get CompletionItemTag () { return CompletionItemTag; },
    get InsertReplaceEdit () { return InsertReplaceEdit; },
    get InsertTextMode () { return InsertTextMode; },
    get CompletionItemLabelDetails () { return CompletionItemLabelDetails; },
    get CompletionItem () { return CompletionItem; },
    get CompletionList () { return CompletionList; },
    get MarkedString () { return MarkedString; },
    get Hover () { return Hover; },
    get ParameterInformation () { return ParameterInformation; },
    get SignatureInformation () { return SignatureInformation; },
    get DocumentHighlightKind () { return DocumentHighlightKind; },
    get DocumentHighlight () { return DocumentHighlight; },
    get SymbolKind () { return SymbolKind; },
    get SymbolTag () { return SymbolTag; },
    get SymbolInformation () { return SymbolInformation; },
    get DocumentSymbol () { return DocumentSymbol; },
    get CodeActionKind () { return CodeActionKind; },
    get CodeActionContext () { return CodeActionContext; },
    get CodeAction () { return CodeAction; },
    get CodeLens () { return CodeLens; },
    get FormattingOptions () { return FormattingOptions; },
    get DocumentLink () { return DocumentLink; },
    get SelectionRange () { return SelectionRange; },
    get SemanticTokenTypes () { return SemanticTokenTypes; },
    get SemanticTokenModifiers () { return SemanticTokenModifiers; },
    get SemanticTokens () { return SemanticTokens; },
    EOL: EOL,
    get TextDocument () { return TextDocument; }
});

var messages = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtocolNotificationType = exports.ProtocolNotificationType0 = exports.ProtocolRequestType = exports.ProtocolRequestType0 = exports.RegistrationType = void 0;

class RegistrationType {
    constructor(method) {
        this.method = method;
    }
}
exports.RegistrationType = RegistrationType;
class ProtocolRequestType0 extends main$3.RequestType0 {
    constructor(method) {
        super(method);
    }
}
exports.ProtocolRequestType0 = ProtocolRequestType0;
class ProtocolRequestType extends main$3.RequestType {
    constructor(method) {
        super(method, main$3.ParameterStructures.byName);
    }
}
exports.ProtocolRequestType = ProtocolRequestType;
class ProtocolNotificationType0 extends main$3.NotificationType0 {
    constructor(method) {
        super(method);
    }
}
exports.ProtocolNotificationType0 = ProtocolNotificationType0;
class ProtocolNotificationType extends main$3.NotificationType {
    constructor(method) {
        super(method, main$3.ParameterStructures.byName);
    }
}
exports.ProtocolNotificationType = ProtocolNotificationType;
// let x: ProtocolNotificationType<number, { value: number}>;
// let y: ProtocolNotificationType<string, { value: number}>;
// x = y;

});

var is$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectLiteral = exports.typedArray = exports.stringArray = exports.array = exports.func = exports.error = exports.number = exports.string = exports.boolean = void 0;
function boolean(value) {
    return value === true || value === false;
}
exports.boolean = boolean;
function string(value) {
    return typeof value === 'string' || value instanceof String;
}
exports.string = string;
function number(value) {
    return typeof value === 'number' || value instanceof Number;
}
exports.number = number;
function error(value) {
    return value instanceof Error;
}
exports.error = error;
function func(value) {
    return typeof value === 'function';
}
exports.func = func;
function array(value) {
    return Array.isArray(value);
}
exports.array = array;
function stringArray(value) {
    return array(value) && value.every(elem => string(elem));
}
exports.stringArray = stringArray;
function typedArray(value, check) {
    return Array.isArray(value) && value.every(check);
}
exports.typedArray = typedArray;
function objectLiteral(value) {
    // Strictly speaking class instances pass this check as well. Since the LSP
    // doesn't use classes we ignore this for now. If we do we need to add something
    // like this: `Object.getPrototypeOf(Object.getPrototypeOf(x)) === null`
    return value !== null && typeof value === 'object';
}
exports.objectLiteral = objectLiteral;

});

var protocol_implementation = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImplementationRequest = void 0;
(function (ImplementationRequest) {
    ImplementationRequest.method = 'textDocument/implementation';
    ImplementationRequest.type = new messages.ProtocolRequestType(ImplementationRequest.method);
})(exports.ImplementationRequest || (exports.ImplementationRequest = {}));

});

var protocol_typeDefinition = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeDefinitionRequest = void 0;
(function (TypeDefinitionRequest) {
    TypeDefinitionRequest.method = 'textDocument/typeDefinition';
    TypeDefinitionRequest.type = new messages.ProtocolRequestType(TypeDefinitionRequest.method);
})(exports.TypeDefinitionRequest || (exports.TypeDefinitionRequest = {}));

});

var protocol_workspaceFolders = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DidChangeWorkspaceFoldersNotification = exports.WorkspaceFoldersRequest = void 0;
(function (WorkspaceFoldersRequest) {
    WorkspaceFoldersRequest.type = new messages.ProtocolRequestType0('workspace/workspaceFolders');
})(exports.WorkspaceFoldersRequest || (exports.WorkspaceFoldersRequest = {}));
(function (DidChangeWorkspaceFoldersNotification) {
    DidChangeWorkspaceFoldersNotification.type = new messages.ProtocolNotificationType('workspace/didChangeWorkspaceFolders');
})(exports.DidChangeWorkspaceFoldersNotification || (exports.DidChangeWorkspaceFoldersNotification = {}));

});

var protocol_configuration = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationRequest = void 0;
(function (ConfigurationRequest) {
    ConfigurationRequest.type = new messages.ProtocolRequestType('workspace/configuration');
})(exports.ConfigurationRequest || (exports.ConfigurationRequest = {}));

});

var protocol_colorProvider = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorPresentationRequest = exports.DocumentColorRequest = void 0;
(function (DocumentColorRequest) {
    DocumentColorRequest.method = 'textDocument/documentColor';
    DocumentColorRequest.type = new messages.ProtocolRequestType(DocumentColorRequest.method);
})(exports.DocumentColorRequest || (exports.DocumentColorRequest = {}));
(function (ColorPresentationRequest) {
    ColorPresentationRequest.type = new messages.ProtocolRequestType('textDocument/colorPresentation');
})(exports.ColorPresentationRequest || (exports.ColorPresentationRequest = {}));

});

var protocol_foldingRange = createCommonjsModule(function (module, exports) {
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoldingRangeRequest = exports.FoldingRangeKind = void 0;
(function (FoldingRangeKind) {
    /**
     * Folding range for a comment
     */
    FoldingRangeKind["Comment"] = "comment";
    /**
     * Folding range for a imports or includes
     */
    FoldingRangeKind["Imports"] = "imports";
    /**
     * Folding range for a region (e.g. `#region`)
     */
    FoldingRangeKind["Region"] = "region";
})(exports.FoldingRangeKind || (exports.FoldingRangeKind = {}));
(function (FoldingRangeRequest) {
    FoldingRangeRequest.method = 'textDocument/foldingRange';
    FoldingRangeRequest.type = new messages.ProtocolRequestType(FoldingRangeRequest.method);
})(exports.FoldingRangeRequest || (exports.FoldingRangeRequest = {}));

});

var protocol_declaration = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeclarationRequest = void 0;
(function (DeclarationRequest) {
    DeclarationRequest.method = 'textDocument/declaration';
    DeclarationRequest.type = new messages.ProtocolRequestType(DeclarationRequest.method);
})(exports.DeclarationRequest || (exports.DeclarationRequest = {}));

});

var protocol_selectionRange = createCommonjsModule(function (module, exports) {
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectionRangeRequest = void 0;
(function (SelectionRangeRequest) {
    SelectionRangeRequest.method = 'textDocument/selectionRange';
    SelectionRangeRequest.type = new messages.ProtocolRequestType(SelectionRangeRequest.method);
})(exports.SelectionRangeRequest || (exports.SelectionRangeRequest = {}));

});

var protocol_progress = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkDoneProgressCancelNotification = exports.WorkDoneProgressCreateRequest = exports.WorkDoneProgress = void 0;
(function (WorkDoneProgress) {
    WorkDoneProgress.type = new main$3.ProgressType();
    function is(value) {
        return value === WorkDoneProgress.type;
    }
    WorkDoneProgress.is = is;
})(exports.WorkDoneProgress || (exports.WorkDoneProgress = {}));
(function (WorkDoneProgressCreateRequest) {
    WorkDoneProgressCreateRequest.type = new messages.ProtocolRequestType('window/workDoneProgress/create');
})(exports.WorkDoneProgressCreateRequest || (exports.WorkDoneProgressCreateRequest = {}));
(function (WorkDoneProgressCancelNotification) {
    WorkDoneProgressCancelNotification.type = new messages.ProtocolNotificationType('window/workDoneProgress/cancel');
})(exports.WorkDoneProgressCancelNotification || (exports.WorkDoneProgressCancelNotification = {}));

});

var protocol_callHierarchy = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) TypeFox and others. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallHierarchyOutgoingCallsRequest = exports.CallHierarchyIncomingCallsRequest = exports.CallHierarchyPrepareRequest = void 0;
(function (CallHierarchyPrepareRequest) {
    CallHierarchyPrepareRequest.method = 'textDocument/prepareCallHierarchy';
    CallHierarchyPrepareRequest.type = new messages.ProtocolRequestType(CallHierarchyPrepareRequest.method);
})(exports.CallHierarchyPrepareRequest || (exports.CallHierarchyPrepareRequest = {}));
(function (CallHierarchyIncomingCallsRequest) {
    CallHierarchyIncomingCallsRequest.method = 'callHierarchy/incomingCalls';
    CallHierarchyIncomingCallsRequest.type = new messages.ProtocolRequestType(CallHierarchyIncomingCallsRequest.method);
})(exports.CallHierarchyIncomingCallsRequest || (exports.CallHierarchyIncomingCallsRequest = {}));
(function (CallHierarchyOutgoingCallsRequest) {
    CallHierarchyOutgoingCallsRequest.method = 'callHierarchy/outgoingCalls';
    CallHierarchyOutgoingCallsRequest.type = new messages.ProtocolRequestType(CallHierarchyOutgoingCallsRequest.method);
})(exports.CallHierarchyOutgoingCallsRequest || (exports.CallHierarchyOutgoingCallsRequest = {}));

});

var protocol_semanticTokens = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemanticTokensRefreshRequest = exports.SemanticTokensRangeRequest = exports.SemanticTokensDeltaRequest = exports.SemanticTokensRequest = exports.SemanticTokensRegistrationType = exports.TokenFormat = void 0;
(function (TokenFormat) {
    TokenFormat.Relative = 'relative';
})(exports.TokenFormat || (exports.TokenFormat = {}));
(function (SemanticTokensRegistrationType) {
    SemanticTokensRegistrationType.method = 'textDocument/semanticTokens';
    SemanticTokensRegistrationType.type = new messages.RegistrationType(SemanticTokensRegistrationType.method);
})(exports.SemanticTokensRegistrationType || (exports.SemanticTokensRegistrationType = {}));
(function (SemanticTokensRequest) {
    SemanticTokensRequest.method = 'textDocument/semanticTokens/full';
    SemanticTokensRequest.type = new messages.ProtocolRequestType(SemanticTokensRequest.method);
})(exports.SemanticTokensRequest || (exports.SemanticTokensRequest = {}));
(function (SemanticTokensDeltaRequest) {
    SemanticTokensDeltaRequest.method = 'textDocument/semanticTokens/full/delta';
    SemanticTokensDeltaRequest.type = new messages.ProtocolRequestType(SemanticTokensDeltaRequest.method);
})(exports.SemanticTokensDeltaRequest || (exports.SemanticTokensDeltaRequest = {}));
(function (SemanticTokensRangeRequest) {
    SemanticTokensRangeRequest.method = 'textDocument/semanticTokens/range';
    SemanticTokensRangeRequest.type = new messages.ProtocolRequestType(SemanticTokensRangeRequest.method);
})(exports.SemanticTokensRangeRequest || (exports.SemanticTokensRangeRequest = {}));
(function (SemanticTokensRefreshRequest) {
    SemanticTokensRefreshRequest.method = `workspace/semanticTokens/refresh`;
    SemanticTokensRefreshRequest.type = new messages.ProtocolRequestType0(SemanticTokensRefreshRequest.method);
})(exports.SemanticTokensRefreshRequest || (exports.SemanticTokensRefreshRequest = {}));

});

var protocol_showDocument = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowDocumentRequest = void 0;
(function (ShowDocumentRequest) {
    ShowDocumentRequest.method = 'window/showDocument';
    ShowDocumentRequest.type = new messages.ProtocolRequestType(ShowDocumentRequest.method);
})(exports.ShowDocumentRequest || (exports.ShowDocumentRequest = {}));

});

var protocol_linkedEditingRange = createCommonjsModule(function (module, exports) {
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedEditingRangeRequest = void 0;
(function (LinkedEditingRangeRequest) {
    LinkedEditingRangeRequest.method = 'textDocument/linkedEditingRange';
    LinkedEditingRangeRequest.type = new messages.ProtocolRequestType(LinkedEditingRangeRequest.method);
})(exports.LinkedEditingRangeRequest || (exports.LinkedEditingRangeRequest = {}));

});

var protocol_fileOperations = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WillDeleteFilesRequest = exports.DidDeleteFilesNotification = exports.DidRenameFilesNotification = exports.WillRenameFilesRequest = exports.DidCreateFilesNotification = exports.WillCreateFilesRequest = exports.FileOperationPatternKind = void 0;
(function (FileOperationPatternKind) {
    /**
     * The pattern matches a file only.
     */
    FileOperationPatternKind.file = 'file';
    /**
     * The pattern matches a folder only.
     */
    FileOperationPatternKind.folder = 'folder';
})(exports.FileOperationPatternKind || (exports.FileOperationPatternKind = {}));
(function (WillCreateFilesRequest) {
    WillCreateFilesRequest.method = 'workspace/willCreateFiles';
    WillCreateFilesRequest.type = new messages.ProtocolRequestType(WillCreateFilesRequest.method);
})(exports.WillCreateFilesRequest || (exports.WillCreateFilesRequest = {}));
(function (DidCreateFilesNotification) {
    DidCreateFilesNotification.method = 'workspace/didCreateFiles';
    DidCreateFilesNotification.type = new messages.ProtocolNotificationType(DidCreateFilesNotification.method);
})(exports.DidCreateFilesNotification || (exports.DidCreateFilesNotification = {}));
(function (WillRenameFilesRequest) {
    WillRenameFilesRequest.method = 'workspace/willRenameFiles';
    WillRenameFilesRequest.type = new messages.ProtocolRequestType(WillRenameFilesRequest.method);
})(exports.WillRenameFilesRequest || (exports.WillRenameFilesRequest = {}));
(function (DidRenameFilesNotification) {
    DidRenameFilesNotification.method = 'workspace/didRenameFiles';
    DidRenameFilesNotification.type = new messages.ProtocolNotificationType(DidRenameFilesNotification.method);
})(exports.DidRenameFilesNotification || (exports.DidRenameFilesNotification = {}));
(function (DidDeleteFilesNotification) {
    DidDeleteFilesNotification.method = 'workspace/didDeleteFiles';
    DidDeleteFilesNotification.type = new messages.ProtocolNotificationType(DidDeleteFilesNotification.method);
})(exports.DidDeleteFilesNotification || (exports.DidDeleteFilesNotification = {}));
(function (WillDeleteFilesRequest) {
    WillDeleteFilesRequest.method = 'workspace/willDeleteFiles';
    WillDeleteFilesRequest.type = new messages.ProtocolRequestType(WillDeleteFilesRequest.method);
})(exports.WillDeleteFilesRequest || (exports.WillDeleteFilesRequest = {}));

});

var protocol_moniker = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonikerRequest = exports.MonikerKind = exports.UniquenessLevel = void 0;
(function (UniquenessLevel) {
    /**
     * The moniker is only unique inside a document
     */
    UniquenessLevel["document"] = "document";
    /**
     * The moniker is unique inside a project for which a dump got created
     */
    UniquenessLevel["project"] = "project";
    /**
     * The moniker is unique inside the group to which a project belongs
     */
    UniquenessLevel["group"] = "group";
    /**
     * The moniker is unique inside the moniker scheme.
     */
    UniquenessLevel["scheme"] = "scheme";
    /**
     * The moniker is globally unique
     */
    UniquenessLevel["global"] = "global";
})(exports.UniquenessLevel || (exports.UniquenessLevel = {}));
(function (MonikerKind) {
    /**
     * The moniker represent a symbol that is imported into a project
     */
    MonikerKind["import"] = "import";
    /**
     * The moniker represents a symbol that is exported from a project
     */
    MonikerKind["export"] = "export";
    /**
     * The moniker represents a symbol that is local to a project (e.g. a local
     * variable of a function, a class not visible outside the project, ...)
     */
    MonikerKind["local"] = "local";
})(exports.MonikerKind || (exports.MonikerKind = {}));
(function (MonikerRequest) {
    MonikerRequest.method = 'textDocument/moniker';
    MonikerRequest.type = new messages.ProtocolRequestType(MonikerRequest.method);
})(exports.MonikerRequest || (exports.MonikerRequest = {}));

});

var protocol = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentLinkRequest = exports.CodeLensRefreshRequest = exports.CodeLensResolveRequest = exports.CodeLensRequest = exports.WorkspaceSymbolRequest = exports.CodeActionResolveRequest = exports.CodeActionRequest = exports.DocumentSymbolRequest = exports.DocumentHighlightRequest = exports.ReferencesRequest = exports.DefinitionRequest = exports.SignatureHelpRequest = exports.SignatureHelpTriggerKind = exports.HoverRequest = exports.CompletionResolveRequest = exports.CompletionRequest = exports.CompletionTriggerKind = exports.PublishDiagnosticsNotification = exports.WatchKind = exports.FileChangeType = exports.DidChangeWatchedFilesNotification = exports.WillSaveTextDocumentWaitUntilRequest = exports.WillSaveTextDocumentNotification = exports.TextDocumentSaveReason = exports.DidSaveTextDocumentNotification = exports.DidCloseTextDocumentNotification = exports.DidChangeTextDocumentNotification = exports.TextDocumentContentChangeEvent = exports.DidOpenTextDocumentNotification = exports.TextDocumentSyncKind = exports.TelemetryEventNotification = exports.LogMessageNotification = exports.ShowMessageRequest = exports.ShowMessageNotification = exports.MessageType = exports.DidChangeConfigurationNotification = exports.ExitNotification = exports.ShutdownRequest = exports.InitializedNotification = exports.InitializeError = exports.InitializeRequest = exports.WorkDoneProgressOptions = exports.TextDocumentRegistrationOptions = exports.StaticRegistrationOptions = exports.FailureHandlingKind = exports.ResourceOperationKind = exports.UnregistrationRequest = exports.RegistrationRequest = exports.DocumentSelector = exports.DocumentFilter = void 0;
exports.MonikerRequest = exports.MonikerKind = exports.UniquenessLevel = exports.WillDeleteFilesRequest = exports.DidDeleteFilesNotification = exports.WillRenameFilesRequest = exports.DidRenameFilesNotification = exports.WillCreateFilesRequest = exports.DidCreateFilesNotification = exports.FileOperationPatternKind = exports.LinkedEditingRangeRequest = exports.ShowDocumentRequest = exports.SemanticTokensRegistrationType = exports.SemanticTokensRefreshRequest = exports.SemanticTokensRangeRequest = exports.SemanticTokensDeltaRequest = exports.SemanticTokensRequest = exports.TokenFormat = exports.CallHierarchyPrepareRequest = exports.CallHierarchyOutgoingCallsRequest = exports.CallHierarchyIncomingCallsRequest = exports.WorkDoneProgressCancelNotification = exports.WorkDoneProgressCreateRequest = exports.WorkDoneProgress = exports.SelectionRangeRequest = exports.DeclarationRequest = exports.FoldingRangeRequest = exports.ColorPresentationRequest = exports.DocumentColorRequest = exports.ConfigurationRequest = exports.DidChangeWorkspaceFoldersNotification = exports.WorkspaceFoldersRequest = exports.TypeDefinitionRequest = exports.ImplementationRequest = exports.ApplyWorkspaceEditRequest = exports.ExecuteCommandRequest = exports.PrepareRenameRequest = exports.RenameRequest = exports.PrepareSupportDefaultBehavior = exports.DocumentOnTypeFormattingRequest = exports.DocumentRangeFormattingRequest = exports.DocumentFormattingRequest = exports.DocumentLinkResolveRequest = void 0;



Object.defineProperty(exports, "ImplementationRequest", { enumerable: true, get: function () { return protocol_implementation.ImplementationRequest; } });

Object.defineProperty(exports, "TypeDefinitionRequest", { enumerable: true, get: function () { return protocol_typeDefinition.TypeDefinitionRequest; } });

Object.defineProperty(exports, "WorkspaceFoldersRequest", { enumerable: true, get: function () { return protocol_workspaceFolders.WorkspaceFoldersRequest; } });
Object.defineProperty(exports, "DidChangeWorkspaceFoldersNotification", { enumerable: true, get: function () { return protocol_workspaceFolders.DidChangeWorkspaceFoldersNotification; } });

Object.defineProperty(exports, "ConfigurationRequest", { enumerable: true, get: function () { return protocol_configuration.ConfigurationRequest; } });

Object.defineProperty(exports, "DocumentColorRequest", { enumerable: true, get: function () { return protocol_colorProvider.DocumentColorRequest; } });
Object.defineProperty(exports, "ColorPresentationRequest", { enumerable: true, get: function () { return protocol_colorProvider.ColorPresentationRequest; } });

Object.defineProperty(exports, "FoldingRangeRequest", { enumerable: true, get: function () { return protocol_foldingRange.FoldingRangeRequest; } });

Object.defineProperty(exports, "DeclarationRequest", { enumerable: true, get: function () { return protocol_declaration.DeclarationRequest; } });

Object.defineProperty(exports, "SelectionRangeRequest", { enumerable: true, get: function () { return protocol_selectionRange.SelectionRangeRequest; } });

Object.defineProperty(exports, "WorkDoneProgress", { enumerable: true, get: function () { return protocol_progress.WorkDoneProgress; } });
Object.defineProperty(exports, "WorkDoneProgressCreateRequest", { enumerable: true, get: function () { return protocol_progress.WorkDoneProgressCreateRequest; } });
Object.defineProperty(exports, "WorkDoneProgressCancelNotification", { enumerable: true, get: function () { return protocol_progress.WorkDoneProgressCancelNotification; } });

Object.defineProperty(exports, "CallHierarchyIncomingCallsRequest", { enumerable: true, get: function () { return protocol_callHierarchy.CallHierarchyIncomingCallsRequest; } });
Object.defineProperty(exports, "CallHierarchyOutgoingCallsRequest", { enumerable: true, get: function () { return protocol_callHierarchy.CallHierarchyOutgoingCallsRequest; } });
Object.defineProperty(exports, "CallHierarchyPrepareRequest", { enumerable: true, get: function () { return protocol_callHierarchy.CallHierarchyPrepareRequest; } });

Object.defineProperty(exports, "TokenFormat", { enumerable: true, get: function () { return protocol_semanticTokens.TokenFormat; } });
Object.defineProperty(exports, "SemanticTokensRequest", { enumerable: true, get: function () { return protocol_semanticTokens.SemanticTokensRequest; } });
Object.defineProperty(exports, "SemanticTokensDeltaRequest", { enumerable: true, get: function () { return protocol_semanticTokens.SemanticTokensDeltaRequest; } });
Object.defineProperty(exports, "SemanticTokensRangeRequest", { enumerable: true, get: function () { return protocol_semanticTokens.SemanticTokensRangeRequest; } });
Object.defineProperty(exports, "SemanticTokensRefreshRequest", { enumerable: true, get: function () { return protocol_semanticTokens.SemanticTokensRefreshRequest; } });
Object.defineProperty(exports, "SemanticTokensRegistrationType", { enumerable: true, get: function () { return protocol_semanticTokens.SemanticTokensRegistrationType; } });

Object.defineProperty(exports, "ShowDocumentRequest", { enumerable: true, get: function () { return protocol_showDocument.ShowDocumentRequest; } });

Object.defineProperty(exports, "LinkedEditingRangeRequest", { enumerable: true, get: function () { return protocol_linkedEditingRange.LinkedEditingRangeRequest; } });

Object.defineProperty(exports, "FileOperationPatternKind", { enumerable: true, get: function () { return protocol_fileOperations.FileOperationPatternKind; } });
Object.defineProperty(exports, "DidCreateFilesNotification", { enumerable: true, get: function () { return protocol_fileOperations.DidCreateFilesNotification; } });
Object.defineProperty(exports, "WillCreateFilesRequest", { enumerable: true, get: function () { return protocol_fileOperations.WillCreateFilesRequest; } });
Object.defineProperty(exports, "DidRenameFilesNotification", { enumerable: true, get: function () { return protocol_fileOperations.DidRenameFilesNotification; } });
Object.defineProperty(exports, "WillRenameFilesRequest", { enumerable: true, get: function () { return protocol_fileOperations.WillRenameFilesRequest; } });
Object.defineProperty(exports, "DidDeleteFilesNotification", { enumerable: true, get: function () { return protocol_fileOperations.DidDeleteFilesNotification; } });
Object.defineProperty(exports, "WillDeleteFilesRequest", { enumerable: true, get: function () { return protocol_fileOperations.WillDeleteFilesRequest; } });

Object.defineProperty(exports, "UniquenessLevel", { enumerable: true, get: function () { return protocol_moniker.UniquenessLevel; } });
Object.defineProperty(exports, "MonikerKind", { enumerable: true, get: function () { return protocol_moniker.MonikerKind; } });
Object.defineProperty(exports, "MonikerRequest", { enumerable: true, get: function () { return protocol_moniker.MonikerRequest; } });
/**
 * The DocumentFilter namespace provides helper functions to work with
 * [DocumentFilter](#DocumentFilter) literals.
 */
var DocumentFilter;
(function (DocumentFilter) {
    function is(value) {
        const candidate = value;
        return is$1.string(candidate.language) || is$1.string(candidate.scheme) || is$1.string(candidate.pattern);
    }
    DocumentFilter.is = is;
})(DocumentFilter = exports.DocumentFilter || (exports.DocumentFilter = {}));
/**
 * The DocumentSelector namespace provides helper functions to work with
 * [DocumentSelector](#DocumentSelector)s.
 */
var DocumentSelector;
(function (DocumentSelector) {
    function is(value) {
        if (!Array.isArray(value)) {
            return false;
        }
        for (let elem of value) {
            if (!is$1.string(elem) && !DocumentFilter.is(elem)) {
                return false;
            }
        }
        return true;
    }
    DocumentSelector.is = is;
})(DocumentSelector = exports.DocumentSelector || (exports.DocumentSelector = {}));
(function (RegistrationRequest) {
    RegistrationRequest.type = new messages.ProtocolRequestType('client/registerCapability');
})(exports.RegistrationRequest || (exports.RegistrationRequest = {}));
(function (UnregistrationRequest) {
    UnregistrationRequest.type = new messages.ProtocolRequestType('client/unregisterCapability');
})(exports.UnregistrationRequest || (exports.UnregistrationRequest = {}));
(function (ResourceOperationKind) {
    /**
     * Supports creating new files and folders.
     */
    ResourceOperationKind.Create = 'create';
    /**
     * Supports renaming existing files and folders.
     */
    ResourceOperationKind.Rename = 'rename';
    /**
     * Supports deleting existing files and folders.
     */
    ResourceOperationKind.Delete = 'delete';
})(exports.ResourceOperationKind || (exports.ResourceOperationKind = {}));
(function (FailureHandlingKind) {
    /**
     * Applying the workspace change is simply aborted if one of the changes provided
     * fails. All operations executed before the failing operation stay executed.
     */
    FailureHandlingKind.Abort = 'abort';
    /**
     * All operations are executed transactional. That means they either all
     * succeed or no changes at all are applied to the workspace.
     */
    FailureHandlingKind.Transactional = 'transactional';
    /**
     * If the workspace edit contains only textual file changes they are executed transactional.
     * If resource changes (create, rename or delete file) are part of the change the failure
     * handling strategy is abort.
     */
    FailureHandlingKind.TextOnlyTransactional = 'textOnlyTransactional';
    /**
     * The client tries to undo the operations already executed. But there is no
     * guarantee that this is succeeding.
     */
    FailureHandlingKind.Undo = 'undo';
})(exports.FailureHandlingKind || (exports.FailureHandlingKind = {}));
(function (StaticRegistrationOptions) {
    function hasId(value) {
        const candidate = value;
        return candidate && is$1.string(candidate.id) && candidate.id.length > 0;
    }
    StaticRegistrationOptions.hasId = hasId;
})(exports.StaticRegistrationOptions || (exports.StaticRegistrationOptions = {}));
(function (TextDocumentRegistrationOptions) {
    function is(value) {
        const candidate = value;
        return candidate && (candidate.documentSelector === null || DocumentSelector.is(candidate.documentSelector));
    }
    TextDocumentRegistrationOptions.is = is;
})(exports.TextDocumentRegistrationOptions || (exports.TextDocumentRegistrationOptions = {}));
(function (WorkDoneProgressOptions) {
    function is(value) {
        const candidate = value;
        return is$1.objectLiteral(candidate) && (candidate.workDoneProgress === undefined || is$1.boolean(candidate.workDoneProgress));
    }
    WorkDoneProgressOptions.is = is;
    function hasWorkDoneProgress(value) {
        const candidate = value;
        return candidate && is$1.boolean(candidate.workDoneProgress);
    }
    WorkDoneProgressOptions.hasWorkDoneProgress = hasWorkDoneProgress;
})(exports.WorkDoneProgressOptions || (exports.WorkDoneProgressOptions = {}));
(function (InitializeRequest) {
    InitializeRequest.type = new messages.ProtocolRequestType('initialize');
})(exports.InitializeRequest || (exports.InitializeRequest = {}));
(function (InitializeError) {
    /**
     * If the protocol version provided by the client can't be handled by the server.
     * @deprecated This initialize error got replaced by client capabilities. There is
     * no version handshake in version 3.0x
     */
    InitializeError.unknownProtocolVersion = 1;
})(exports.InitializeError || (exports.InitializeError = {}));
(function (InitializedNotification) {
    InitializedNotification.type = new messages.ProtocolNotificationType('initialized');
})(exports.InitializedNotification || (exports.InitializedNotification = {}));
(function (ShutdownRequest) {
    ShutdownRequest.type = new messages.ProtocolRequestType0('shutdown');
})(exports.ShutdownRequest || (exports.ShutdownRequest = {}));
(function (ExitNotification) {
    ExitNotification.type = new messages.ProtocolNotificationType0('exit');
})(exports.ExitNotification || (exports.ExitNotification = {}));
(function (DidChangeConfigurationNotification) {
    DidChangeConfigurationNotification.type = new messages.ProtocolNotificationType('workspace/didChangeConfiguration');
})(exports.DidChangeConfigurationNotification || (exports.DidChangeConfigurationNotification = {}));
(function (MessageType) {
    /**
     * An error message.
     */
    MessageType.Error = 1;
    /**
     * A warning message.
     */
    MessageType.Warning = 2;
    /**
     * An information message.
     */
    MessageType.Info = 3;
    /**
     * A log message.
     */
    MessageType.Log = 4;
})(exports.MessageType || (exports.MessageType = {}));
(function (ShowMessageNotification) {
    ShowMessageNotification.type = new messages.ProtocolNotificationType('window/showMessage');
})(exports.ShowMessageNotification || (exports.ShowMessageNotification = {}));
(function (ShowMessageRequest) {
    ShowMessageRequest.type = new messages.ProtocolRequestType('window/showMessageRequest');
})(exports.ShowMessageRequest || (exports.ShowMessageRequest = {}));
(function (LogMessageNotification) {
    LogMessageNotification.type = new messages.ProtocolNotificationType('window/logMessage');
})(exports.LogMessageNotification || (exports.LogMessageNotification = {}));
(function (TelemetryEventNotification) {
    TelemetryEventNotification.type = new messages.ProtocolNotificationType('telemetry/event');
})(exports.TelemetryEventNotification || (exports.TelemetryEventNotification = {}));
(function (TextDocumentSyncKind) {
    /**
     * Documents should not be synced at all.
     */
    TextDocumentSyncKind.None = 0;
    /**
     * Documents are synced by always sending the full content
     * of the document.
     */
    TextDocumentSyncKind.Full = 1;
    /**
     * Documents are synced by sending the full content on open.
     * After that only incremental updates to the document are
     * send.
     */
    TextDocumentSyncKind.Incremental = 2;
})(exports.TextDocumentSyncKind || (exports.TextDocumentSyncKind = {}));
(function (DidOpenTextDocumentNotification) {
    DidOpenTextDocumentNotification.method = 'textDocument/didOpen';
    DidOpenTextDocumentNotification.type = new messages.ProtocolNotificationType(DidOpenTextDocumentNotification.method);
})(exports.DidOpenTextDocumentNotification || (exports.DidOpenTextDocumentNotification = {}));
(function (TextDocumentContentChangeEvent) {
    /**
     * Checks whether the information describes a delta event.
     */
    function isIncremental(event) {
        let candidate = event;
        return candidate !== undefined && candidate !== null &&
            typeof candidate.text === 'string' && candidate.range !== undefined &&
            (candidate.rangeLength === undefined || typeof candidate.rangeLength === 'number');
    }
    TextDocumentContentChangeEvent.isIncremental = isIncremental;
    /**
     * Checks whether the information describes a full replacement event.
     */
    function isFull(event) {
        let candidate = event;
        return candidate !== undefined && candidate !== null &&
            typeof candidate.text === 'string' && candidate.range === undefined && candidate.rangeLength === undefined;
    }
    TextDocumentContentChangeEvent.isFull = isFull;
})(exports.TextDocumentContentChangeEvent || (exports.TextDocumentContentChangeEvent = {}));
(function (DidChangeTextDocumentNotification) {
    DidChangeTextDocumentNotification.method = 'textDocument/didChange';
    DidChangeTextDocumentNotification.type = new messages.ProtocolNotificationType(DidChangeTextDocumentNotification.method);
})(exports.DidChangeTextDocumentNotification || (exports.DidChangeTextDocumentNotification = {}));
(function (DidCloseTextDocumentNotification) {
    DidCloseTextDocumentNotification.method = 'textDocument/didClose';
    DidCloseTextDocumentNotification.type = new messages.ProtocolNotificationType(DidCloseTextDocumentNotification.method);
})(exports.DidCloseTextDocumentNotification || (exports.DidCloseTextDocumentNotification = {}));
(function (DidSaveTextDocumentNotification) {
    DidSaveTextDocumentNotification.method = 'textDocument/didSave';
    DidSaveTextDocumentNotification.type = new messages.ProtocolNotificationType(DidSaveTextDocumentNotification.method);
})(exports.DidSaveTextDocumentNotification || (exports.DidSaveTextDocumentNotification = {}));
(function (TextDocumentSaveReason) {
    /**
     * Manually triggered, e.g. by the user pressing save, by starting debugging,
     * or by an API call.
     */
    TextDocumentSaveReason.Manual = 1;
    /**
     * Automatic after a delay.
     */
    TextDocumentSaveReason.AfterDelay = 2;
    /**
     * When the editor lost focus.
     */
    TextDocumentSaveReason.FocusOut = 3;
})(exports.TextDocumentSaveReason || (exports.TextDocumentSaveReason = {}));
(function (WillSaveTextDocumentNotification) {
    WillSaveTextDocumentNotification.method = 'textDocument/willSave';
    WillSaveTextDocumentNotification.type = new messages.ProtocolNotificationType(WillSaveTextDocumentNotification.method);
})(exports.WillSaveTextDocumentNotification || (exports.WillSaveTextDocumentNotification = {}));
(function (WillSaveTextDocumentWaitUntilRequest) {
    WillSaveTextDocumentWaitUntilRequest.method = 'textDocument/willSaveWaitUntil';
    WillSaveTextDocumentWaitUntilRequest.type = new messages.ProtocolRequestType(WillSaveTextDocumentWaitUntilRequest.method);
})(exports.WillSaveTextDocumentWaitUntilRequest || (exports.WillSaveTextDocumentWaitUntilRequest = {}));
(function (DidChangeWatchedFilesNotification) {
    DidChangeWatchedFilesNotification.type = new messages.ProtocolNotificationType('workspace/didChangeWatchedFiles');
})(exports.DidChangeWatchedFilesNotification || (exports.DidChangeWatchedFilesNotification = {}));
(function (FileChangeType) {
    /**
     * The file got created.
     */
    FileChangeType.Created = 1;
    /**
     * The file got changed.
     */
    FileChangeType.Changed = 2;
    /**
     * The file got deleted.
     */
    FileChangeType.Deleted = 3;
})(exports.FileChangeType || (exports.FileChangeType = {}));
(function (WatchKind) {
    /**
     * Interested in create events.
     */
    WatchKind.Create = 1;
    /**
     * Interested in change events
     */
    WatchKind.Change = 2;
    /**
     * Interested in delete events
     */
    WatchKind.Delete = 4;
})(exports.WatchKind || (exports.WatchKind = {}));
(function (PublishDiagnosticsNotification) {
    PublishDiagnosticsNotification.type = new messages.ProtocolNotificationType('textDocument/publishDiagnostics');
})(exports.PublishDiagnosticsNotification || (exports.PublishDiagnosticsNotification = {}));
(function (CompletionTriggerKind) {
    /**
     * Completion was triggered by typing an identifier (24x7 code
     * complete), manual invocation (e.g Ctrl+Space) or via API.
     */
    CompletionTriggerKind.Invoked = 1;
    /**
     * Completion was triggered by a trigger character specified by
     * the `triggerCharacters` properties of the `CompletionRegistrationOptions`.
     */
    CompletionTriggerKind.TriggerCharacter = 2;
    /**
     * Completion was re-triggered as current completion list is incomplete
     */
    CompletionTriggerKind.TriggerForIncompleteCompletions = 3;
})(exports.CompletionTriggerKind || (exports.CompletionTriggerKind = {}));
(function (CompletionRequest) {
    CompletionRequest.method = 'textDocument/completion';
    CompletionRequest.type = new messages.ProtocolRequestType(CompletionRequest.method);
})(exports.CompletionRequest || (exports.CompletionRequest = {}));
(function (CompletionResolveRequest) {
    CompletionResolveRequest.method = 'completionItem/resolve';
    CompletionResolveRequest.type = new messages.ProtocolRequestType(CompletionResolveRequest.method);
})(exports.CompletionResolveRequest || (exports.CompletionResolveRequest = {}));
(function (HoverRequest) {
    HoverRequest.method = 'textDocument/hover';
    HoverRequest.type = new messages.ProtocolRequestType(HoverRequest.method);
})(exports.HoverRequest || (exports.HoverRequest = {}));
(function (SignatureHelpTriggerKind) {
    /**
     * Signature help was invoked manually by the user or by a command.
     */
    SignatureHelpTriggerKind.Invoked = 1;
    /**
     * Signature help was triggered by a trigger character.
     */
    SignatureHelpTriggerKind.TriggerCharacter = 2;
    /**
     * Signature help was triggered by the cursor moving or by the document content changing.
     */
    SignatureHelpTriggerKind.ContentChange = 3;
})(exports.SignatureHelpTriggerKind || (exports.SignatureHelpTriggerKind = {}));
(function (SignatureHelpRequest) {
    SignatureHelpRequest.method = 'textDocument/signatureHelp';
    SignatureHelpRequest.type = new messages.ProtocolRequestType(SignatureHelpRequest.method);
})(exports.SignatureHelpRequest || (exports.SignatureHelpRequest = {}));
(function (DefinitionRequest) {
    DefinitionRequest.method = 'textDocument/definition';
    DefinitionRequest.type = new messages.ProtocolRequestType(DefinitionRequest.method);
})(exports.DefinitionRequest || (exports.DefinitionRequest = {}));
(function (ReferencesRequest) {
    ReferencesRequest.method = 'textDocument/references';
    ReferencesRequest.type = new messages.ProtocolRequestType(ReferencesRequest.method);
})(exports.ReferencesRequest || (exports.ReferencesRequest = {}));
(function (DocumentHighlightRequest) {
    DocumentHighlightRequest.method = 'textDocument/documentHighlight';
    DocumentHighlightRequest.type = new messages.ProtocolRequestType(DocumentHighlightRequest.method);
})(exports.DocumentHighlightRequest || (exports.DocumentHighlightRequest = {}));
(function (DocumentSymbolRequest) {
    DocumentSymbolRequest.method = 'textDocument/documentSymbol';
    DocumentSymbolRequest.type = new messages.ProtocolRequestType(DocumentSymbolRequest.method);
})(exports.DocumentSymbolRequest || (exports.DocumentSymbolRequest = {}));
(function (CodeActionRequest) {
    CodeActionRequest.method = 'textDocument/codeAction';
    CodeActionRequest.type = new messages.ProtocolRequestType(CodeActionRequest.method);
})(exports.CodeActionRequest || (exports.CodeActionRequest = {}));
(function (CodeActionResolveRequest) {
    CodeActionResolveRequest.method = 'codeAction/resolve';
    CodeActionResolveRequest.type = new messages.ProtocolRequestType(CodeActionResolveRequest.method);
})(exports.CodeActionResolveRequest || (exports.CodeActionResolveRequest = {}));
(function (WorkspaceSymbolRequest) {
    WorkspaceSymbolRequest.method = 'workspace/symbol';
    WorkspaceSymbolRequest.type = new messages.ProtocolRequestType(WorkspaceSymbolRequest.method);
})(exports.WorkspaceSymbolRequest || (exports.WorkspaceSymbolRequest = {}));
(function (CodeLensRequest) {
    CodeLensRequest.method = 'textDocument/codeLens';
    CodeLensRequest.type = new messages.ProtocolRequestType(CodeLensRequest.method);
})(exports.CodeLensRequest || (exports.CodeLensRequest = {}));
(function (CodeLensResolveRequest) {
    CodeLensResolveRequest.method = 'codeLens/resolve';
    CodeLensResolveRequest.type = new messages.ProtocolRequestType(CodeLensResolveRequest.method);
})(exports.CodeLensResolveRequest || (exports.CodeLensResolveRequest = {}));
(function (CodeLensRefreshRequest) {
    CodeLensRefreshRequest.method = `workspace/codeLens/refresh`;
    CodeLensRefreshRequest.type = new messages.ProtocolRequestType0(CodeLensRefreshRequest.method);
})(exports.CodeLensRefreshRequest || (exports.CodeLensRefreshRequest = {}));
(function (DocumentLinkRequest) {
    DocumentLinkRequest.method = 'textDocument/documentLink';
    DocumentLinkRequest.type = new messages.ProtocolRequestType(DocumentLinkRequest.method);
})(exports.DocumentLinkRequest || (exports.DocumentLinkRequest = {}));
(function (DocumentLinkResolveRequest) {
    DocumentLinkResolveRequest.method = 'documentLink/resolve';
    DocumentLinkResolveRequest.type = new messages.ProtocolRequestType(DocumentLinkResolveRequest.method);
})(exports.DocumentLinkResolveRequest || (exports.DocumentLinkResolveRequest = {}));
(function (DocumentFormattingRequest) {
    DocumentFormattingRequest.method = 'textDocument/formatting';
    DocumentFormattingRequest.type = new messages.ProtocolRequestType(DocumentFormattingRequest.method);
})(exports.DocumentFormattingRequest || (exports.DocumentFormattingRequest = {}));
(function (DocumentRangeFormattingRequest) {
    DocumentRangeFormattingRequest.method = 'textDocument/rangeFormatting';
    DocumentRangeFormattingRequest.type = new messages.ProtocolRequestType(DocumentRangeFormattingRequest.method);
})(exports.DocumentRangeFormattingRequest || (exports.DocumentRangeFormattingRequest = {}));
(function (DocumentOnTypeFormattingRequest) {
    DocumentOnTypeFormattingRequest.method = 'textDocument/onTypeFormatting';
    DocumentOnTypeFormattingRequest.type = new messages.ProtocolRequestType(DocumentOnTypeFormattingRequest.method);
})(exports.DocumentOnTypeFormattingRequest || (exports.DocumentOnTypeFormattingRequest = {}));
(function (PrepareSupportDefaultBehavior) {
    /**
     * The client's default behavior is to select the identifier
     * according the to language's syntax rule.
     */
    PrepareSupportDefaultBehavior.Identifier = 1;
})(exports.PrepareSupportDefaultBehavior || (exports.PrepareSupportDefaultBehavior = {}));
(function (RenameRequest) {
    RenameRequest.method = 'textDocument/rename';
    RenameRequest.type = new messages.ProtocolRequestType(RenameRequest.method);
})(exports.RenameRequest || (exports.RenameRequest = {}));
(function (PrepareRenameRequest) {
    PrepareRenameRequest.method = 'textDocument/prepareRename';
    PrepareRenameRequest.type = new messages.ProtocolRequestType(PrepareRenameRequest.method);
})(exports.PrepareRenameRequest || (exports.PrepareRenameRequest = {}));
(function (ExecuteCommandRequest) {
    ExecuteCommandRequest.type = new messages.ProtocolRequestType('workspace/executeCommand');
})(exports.ExecuteCommandRequest || (exports.ExecuteCommandRequest = {}));
(function (ApplyWorkspaceEditRequest) {
    ApplyWorkspaceEditRequest.type = new messages.ProtocolRequestType('workspace/applyEdit');
})(exports.ApplyWorkspaceEditRequest || (exports.ApplyWorkspaceEditRequest = {}));

});

var connection$1 = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProtocolConnection = void 0;

function createProtocolConnection(input, output, logger, options) {
    if (main$3.ConnectionStrategy.is(options)) {
        options = { connectionStrategy: options };
    }
    return main$3.createMessageConnection(input, output, logger, options);
}
exports.createProtocolConnection = createProtocolConnection;

});

var proposed_diagnostic$1 = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) TypeFox and others. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagnosticRefreshRequest = exports.DiagnosticRequest = exports.DiagnosticServerCancellationData = exports.DiagnosticTriggerKind = exports.DiagnosticPullModeFlags = void 0;
(function (DiagnosticPullModeFlags) {
    /**
     * Trigger the diagnostic pull on open only.
     */
    DiagnosticPullModeFlags.onOpen = 1;
    /**
     * Trigger the diagnostic pull on type only
     */
    DiagnosticPullModeFlags.onType = 2;
    /**
     * Trigger the diagnostic pull on save only
     */
    DiagnosticPullModeFlags.onSave = 4;
    /**
     * Trigger the diagnostic pull on open, type and save.
     */
    DiagnosticPullModeFlags.all = DiagnosticPullModeFlags.onOpen | DiagnosticPullModeFlags.onType | DiagnosticPullModeFlags.onSave;
    function is(value) {
        return DiagnosticPullModeFlags.onType <= value && value <= DiagnosticPullModeFlags.all;
    }
    DiagnosticPullModeFlags.is = is;
    function isOpen(value) {
        return (value & DiagnosticPullModeFlags.onOpen) !== 0;
    }
    DiagnosticPullModeFlags.isOpen = isOpen;
    function isType(value) {
        return (value & DiagnosticPullModeFlags.onType) !== 0;
    }
    DiagnosticPullModeFlags.isType = isType;
    function isSave(value) {
        return (value & DiagnosticPullModeFlags.onSave) !== 0;
    }
    DiagnosticPullModeFlags.isSave = isSave;
})(exports.DiagnosticPullModeFlags || (exports.DiagnosticPullModeFlags = {}));
(function (DiagnosticTriggerKind) {
    /**
     * The request got triggered through some API
     */
    DiagnosticTriggerKind.Invoked = 1;
    /**
     * The request got triggered because the user opened a document.
     */
    DiagnosticTriggerKind.Opened = 2;
    /**
     * The request got triggered because the user typed in a document.
     */
    DiagnosticTriggerKind.Typed = 3;
    /**
     * The request got triggered because the user saved a document.
     */
    DiagnosticTriggerKind.Saved = 4;
    function is(value) {
        return DiagnosticTriggerKind.Invoked <= value && value <= DiagnosticTriggerKind.Saved;
    }
    DiagnosticTriggerKind.is = is;
})(exports.DiagnosticTriggerKind || (exports.DiagnosticTriggerKind = {}));
(function (DiagnosticServerCancellationData) {
    function is(value) {
        const candidate = value;
        return candidate && is$1.boolean(candidate.retriggerRequest);
    }
    DiagnosticServerCancellationData.is = is;
})(exports.DiagnosticServerCancellationData || (exports.DiagnosticServerCancellationData = {}));
(function (DiagnosticRequest) {
    DiagnosticRequest.method = 'textDocument/diagnostic';
    DiagnosticRequest.type = new messages.ProtocolRequestType(DiagnosticRequest.method);
})(exports.DiagnosticRequest || (exports.DiagnosticRequest = {}));
(function (DiagnosticRefreshRequest) {
    DiagnosticRefreshRequest.method = `workspace/diagnostic/refresh`;
    DiagnosticRefreshRequest.type = new messages.ProtocolRequestType0(DiagnosticRefreshRequest.method);
})(exports.DiagnosticRefreshRequest || (exports.DiagnosticRefreshRequest = {}));

});

var require$$1 = /*@__PURE__*/getAugmentedNamespace(main$2);

var api$1 = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proposed = exports.LSPErrorCodes = exports.createProtocolConnection = void 0;
__exportStar(main$3, exports);
__exportStar(require$$1, exports);
__exportStar(messages, exports);
__exportStar(protocol, exports);

Object.defineProperty(exports, "createProtocolConnection", { enumerable: true, get: function () { return connection$1.createProtocolConnection; } });
(function (LSPErrorCodes) {
    /**
    * This is the start range of LSP reserved error codes.
    * It doesn't denote a real error code.
    *
    * @since 3.16.0
    */
    LSPErrorCodes.lspReservedErrorRangeStart = -32899;
    /**
     * The server cancelled the request. This error code should
     * only be used for requests that explicitly support being
     * server cancellable.
     *
     * @since 3.17.0
     */
    LSPErrorCodes.ServerCancelled = -32802;
    /**
     * The server detected that the content of a document got
     * modified outside normal conditions. A server should
     * NOT send this error code if it detects a content change
     * in it unprocessed messages. The result even computed
     * on an older state might still be useful for the client.
     *
     * If a client decides that a result is not of any use anymore
     * the client should cancel the request.
     */
    LSPErrorCodes.ContentModified = -32801;
    /**
     * The client has canceled a request and a server as detected
     * the cancel.
     */
    LSPErrorCodes.RequestCancelled = -32800;
    /**
    * This is the end range of LSP reserved error codes.
    * It doesn't denote a real error code.
    *
    * @since 3.16.0
    */
    LSPErrorCodes.lspReservedErrorRangeEnd = -32800;
})(exports.LSPErrorCodes || (exports.LSPErrorCodes = {}));
(function (Proposed) {
    Proposed.DiagnosticPullModeFlags = proposed_diagnostic$1.DiagnosticPullModeFlags;
    Proposed.DiagnosticTriggerKind = proposed_diagnostic$1.DiagnosticTriggerKind;
    Proposed.DiagnosticServerCancellationData = proposed_diagnostic$1.DiagnosticServerCancellationData;
    Proposed.DiagnosticRequest = proposed_diagnostic$1.DiagnosticRequest;
    Proposed.DiagnosticRefreshRequest = proposed_diagnostic$1.DiagnosticRefreshRequest;
})(exports.Proposed || (exports.Proposed = {}));

});

var main$1 = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProtocolConnection = void 0;

__exportStar(browser$2, exports);
__exportStar(api$1, exports);
function createProtocolConnection(reader, writer, logger, options) {
    return browser$2.createMessageConnection(reader, writer, logger, options);
}
exports.createProtocolConnection = createProtocolConnection;

});

var semanticTokens = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemanticTokensBuilder = exports.SemanticTokensFeature = void 0;

const SemanticTokensFeature = (Base) => {
    return class extends Base {
        get semanticTokens() {
            return {
                refresh: () => {
                    return this.connection.sendRequest(main$1.SemanticTokensRefreshRequest.type);
                },
                on: (handler) => {
                    const type = main$1.SemanticTokensRequest.type;
                    this.connection.onRequest(type, (params, cancel) => {
                        return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
                    });
                },
                onDelta: (handler) => {
                    const type = main$1.SemanticTokensDeltaRequest.type;
                    this.connection.onRequest(type, (params, cancel) => {
                        return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
                    });
                },
                onRange: (handler) => {
                    const type = main$1.SemanticTokensRangeRequest.type;
                    this.connection.onRequest(type, (params, cancel) => {
                        return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
                    });
                }
            };
        }
    };
};
exports.SemanticTokensFeature = SemanticTokensFeature;
class SemanticTokensBuilder {
    constructor() {
        this._prevData = undefined;
        this.initialize();
    }
    initialize() {
        this._id = Date.now();
        this._prevLine = 0;
        this._prevChar = 0;
        this._data = [];
        this._dataLen = 0;
    }
    push(line, char, length, tokenType, tokenModifiers) {
        let pushLine = line;
        let pushChar = char;
        if (this._dataLen > 0) {
            pushLine -= this._prevLine;
            if (pushLine === 0) {
                pushChar -= this._prevChar;
            }
        }
        this._data[this._dataLen++] = pushLine;
        this._data[this._dataLen++] = pushChar;
        this._data[this._dataLen++] = length;
        this._data[this._dataLen++] = tokenType;
        this._data[this._dataLen++] = tokenModifiers;
        this._prevLine = line;
        this._prevChar = char;
    }
    get id() {
        return this._id.toString();
    }
    previousResult(id) {
        if (this.id === id) {
            this._prevData = this._data;
        }
        this.initialize();
    }
    build() {
        this._prevData = undefined;
        return {
            resultId: this.id,
            data: this._data
        };
    }
    canBuildEdits() {
        return this._prevData !== undefined;
    }
    buildEdits() {
        if (this._prevData !== undefined) {
            const prevDataLength = this._prevData.length;
            const dataLength = this._data.length;
            let startIndex = 0;
            while (startIndex < dataLength && startIndex < prevDataLength && this._prevData[startIndex] === this._data[startIndex]) {
                startIndex++;
            }
            if (startIndex < dataLength && startIndex < prevDataLength) {
                // Find end index
                let endIndex = 0;
                while (endIndex < dataLength && endIndex < prevDataLength && this._prevData[prevDataLength - 1 - endIndex] === this._data[dataLength - 1 - endIndex]) {
                    endIndex++;
                }
                const newData = this._data.slice(startIndex, dataLength - endIndex);
                const result = {
                    resultId: this.id,
                    edits: [
                        { start: startIndex, deleteCount: prevDataLength - endIndex - startIndex, data: newData }
                    ]
                };
                return result;
            }
            else if (startIndex < dataLength) {
                return { resultId: this.id, edits: [
                        { start: startIndex, deleteCount: 0, data: this._data.slice(startIndex) }
                    ] };
            }
            else if (startIndex < prevDataLength) {
                return { resultId: this.id, edits: [
                        { start: startIndex, deleteCount: prevDataLength - startIndex }
                    ] };
            }
            else {
                return { resultId: this.id, edits: [] };
            }
        }
        else {
            return this.build();
        }
    }
}
exports.SemanticTokensBuilder = SemanticTokensBuilder;

});

var is = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.thenable = exports.typedArray = exports.stringArray = exports.array = exports.func = exports.error = exports.number = exports.string = exports.boolean = void 0;
function boolean(value) {
    return value === true || value === false;
}
exports.boolean = boolean;
function string(value) {
    return typeof value === 'string' || value instanceof String;
}
exports.string = string;
function number(value) {
    return typeof value === 'number' || value instanceof Number;
}
exports.number = number;
function error(value) {
    return value instanceof Error;
}
exports.error = error;
function func(value) {
    return typeof value === 'function';
}
exports.func = func;
function array(value) {
    return Array.isArray(value);
}
exports.array = array;
function stringArray(value) {
    return array(value) && value.every(elem => string(elem));
}
exports.stringArray = stringArray;
function typedArray(value, check) {
    return Array.isArray(value) && value.every(check);
}
exports.typedArray = typedArray;
function thenable(value) {
    return value && func(value.then);
}
exports.thenable = thenable;

});

var uuid = createCommonjsModule(function (module, exports) {
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUuid = exports.parse = exports.isUUID = exports.v4 = exports.empty = void 0;
class ValueUUID {
    constructor(_value) {
        this._value = _value;
        // empty
    }
    asHex() {
        return this._value;
    }
    equals(other) {
        return this.asHex() === other.asHex();
    }
}
class V4UUID extends ValueUUID {
    constructor() {
        super([
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            '-',
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            '-',
            '4',
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            '-',
            V4UUID._oneOf(V4UUID._timeHighBits),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            '-',
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
        ].join(''));
    }
    static _oneOf(array) {
        return array[Math.floor(array.length * Math.random())];
    }
    static _randomHex() {
        return V4UUID._oneOf(V4UUID._chars);
    }
}
V4UUID._chars = ['0', '1', '2', '3', '4', '5', '6', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
V4UUID._timeHighBits = ['8', '9', 'a', 'b'];
/**
 * An empty UUID that contains only zeros.
 */
exports.empty = new ValueUUID('00000000-0000-0000-0000-000000000000');
function v4() {
    return new V4UUID();
}
exports.v4 = v4;
const _UUIDPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function isUUID(value) {
    return _UUIDPattern.test(value);
}
exports.isUUID = isUUID;
/**
 * Parses a UUID that is of the format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.
 * @param value A uuid string.
 */
function parse(value) {
    if (!isUUID(value)) {
        throw new Error('invalid uuid');
    }
    return new ValueUUID(value);
}
exports.parse = parse;
function generateUuid() {
    return v4().asHex();
}
exports.generateUuid = generateUuid;

});

var progress = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachPartialResult = exports.ProgressFeature = exports.attachWorkDone = void 0;


class WorkDoneProgressReporterImpl {
    constructor(_connection, _token) {
        this._connection = _connection;
        this._token = _token;
        WorkDoneProgressReporterImpl.Instances.set(this._token, this);
    }
    begin(title, percentage, message, cancellable) {
        let param = {
            kind: 'begin',
            title,
            percentage,
            message,
            cancellable
        };
        this._connection.sendProgress(main$1.WorkDoneProgress.type, this._token, param);
    }
    report(arg0, arg1) {
        let param = {
            kind: 'report'
        };
        if (typeof arg0 === 'number') {
            param.percentage = arg0;
            if (arg1 !== undefined) {
                param.message = arg1;
            }
        }
        else {
            param.message = arg0;
        }
        this._connection.sendProgress(main$1.WorkDoneProgress.type, this._token, param);
    }
    done() {
        WorkDoneProgressReporterImpl.Instances.delete(this._token);
        this._connection.sendProgress(main$1.WorkDoneProgress.type, this._token, { kind: 'end' });
    }
}
WorkDoneProgressReporterImpl.Instances = new Map();
class WorkDoneProgressServerReporterImpl extends WorkDoneProgressReporterImpl {
    constructor(connection, token) {
        super(connection, token);
        this._source = new main$1.CancellationTokenSource();
    }
    get token() {
        return this._source.token;
    }
    done() {
        this._source.dispose();
        super.done();
    }
    cancel() {
        this._source.cancel();
    }
}
class NullProgressReporter {
    constructor() {
    }
    begin() {
    }
    report() {
    }
    done() {
    }
}
class NullProgressServerReporter extends NullProgressReporter {
    constructor() {
        super();
        this._source = new main$1.CancellationTokenSource();
    }
    get token() {
        return this._source.token;
    }
    done() {
        this._source.dispose();
    }
    cancel() {
        this._source.cancel();
    }
}
function attachWorkDone(connection, params) {
    if (params === undefined || params.workDoneToken === undefined) {
        return new NullProgressReporter();
    }
    const token = params.workDoneToken;
    delete params.workDoneToken;
    return new WorkDoneProgressReporterImpl(connection, token);
}
exports.attachWorkDone = attachWorkDone;
const ProgressFeature = (Base) => {
    return class extends Base {
        constructor() {
            super();
            this._progressSupported = false;
        }
        initialize(capabilities) {
            var _a;
            super.initialize(capabilities);
            if (((_a = capabilities === null || capabilities === void 0 ? void 0 : capabilities.window) === null || _a === void 0 ? void 0 : _a.workDoneProgress) === true) {
                this._progressSupported = true;
                this.connection.onNotification(main$1.WorkDoneProgressCancelNotification.type, (params) => {
                    let progress = WorkDoneProgressReporterImpl.Instances.get(params.token);
                    if (progress instanceof WorkDoneProgressServerReporterImpl || progress instanceof NullProgressServerReporter) {
                        progress.cancel();
                    }
                });
            }
        }
        attachWorkDoneProgress(token) {
            if (token === undefined) {
                return new NullProgressReporter();
            }
            else {
                return new WorkDoneProgressReporterImpl(this.connection, token);
            }
        }
        createWorkDoneProgress() {
            if (this._progressSupported) {
                const token = uuid.generateUuid();
                return this.connection.sendRequest(main$1.WorkDoneProgressCreateRequest.type, { token }).then(() => {
                    const result = new WorkDoneProgressServerReporterImpl(this.connection, token);
                    return result;
                });
            }
            else {
                return Promise.resolve(new NullProgressServerReporter());
            }
        }
    };
};
exports.ProgressFeature = ProgressFeature;
var ResultProgress;
(function (ResultProgress) {
    ResultProgress.type = new main$1.ProgressType();
})(ResultProgress || (ResultProgress = {}));
class ResultProgressReporterImpl {
    constructor(_connection, _token) {
        this._connection = _connection;
        this._token = _token;
    }
    report(data) {
        this._connection.sendProgress(ResultProgress.type, this._token, data);
    }
}
function attachPartialResult(connection, params) {
    if (params === undefined || params.partialResultToken === undefined) {
        return undefined;
    }
    const token = params.partialResultToken;
    delete params.partialResultToken;
    return new ResultProgressReporterImpl(connection, token);
}
exports.attachPartialResult = attachPartialResult;

});

var configuration = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationFeature = void 0;


const ConfigurationFeature = (Base) => {
    return class extends Base {
        getConfiguration(arg) {
            if (!arg) {
                return this._getConfiguration({});
            }
            else if (is.string(arg)) {
                return this._getConfiguration({ section: arg });
            }
            else {
                return this._getConfiguration(arg);
            }
        }
        _getConfiguration(arg) {
            let params = {
                items: Array.isArray(arg) ? arg : [arg]
            };
            return this.connection.sendRequest(main$1.ConfigurationRequest.type, params).then((result) => {
                return Array.isArray(arg) ? result : result[0];
            });
        }
    };
};
exports.ConfigurationFeature = ConfigurationFeature;

});

var workspaceFolders = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceFoldersFeature = void 0;

const WorkspaceFoldersFeature = (Base) => {
    return class extends Base {
        constructor() {
            super();
            this._notificationIsAutoRegistered = false;
        }
        initialize(capabilities) {
            super.initialize(capabilities);
            let workspaceCapabilities = capabilities.workspace;
            if (workspaceCapabilities && workspaceCapabilities.workspaceFolders) {
                this._onDidChangeWorkspaceFolders = new main$1.Emitter();
                this.connection.onNotification(main$1.DidChangeWorkspaceFoldersNotification.type, (params) => {
                    this._onDidChangeWorkspaceFolders.fire(params.event);
                });
            }
        }
        fillServerCapabilities(capabilities) {
            var _a, _b;
            super.fillServerCapabilities(capabilities);
            const changeNotifications = (_b = (_a = capabilities.workspace) === null || _a === void 0 ? void 0 : _a.workspaceFolders) === null || _b === void 0 ? void 0 : _b.changeNotifications;
            this._notificationIsAutoRegistered = changeNotifications === true || typeof changeNotifications === 'string';
        }
        getWorkspaceFolders() {
            return this.connection.sendRequest(main$1.WorkspaceFoldersRequest.type);
        }
        get onDidChangeWorkspaceFolders() {
            if (!this._onDidChangeWorkspaceFolders) {
                throw new Error('Client doesn\'t support sending workspace folder change events.');
            }
            if (!this._notificationIsAutoRegistered && !this._unregistration) {
                this._unregistration = this.connection.client.register(main$1.DidChangeWorkspaceFoldersNotification.type);
            }
            return this._onDidChangeWorkspaceFolders.event;
        }
    };
};
exports.WorkspaceFoldersFeature = WorkspaceFoldersFeature;

});

var callHierarchy = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallHierarchyFeature = void 0;

const CallHierarchyFeature = (Base) => {
    return class extends Base {
        get callHierarchy() {
            return {
                onPrepare: (handler) => {
                    this.connection.onRequest(main$1.CallHierarchyPrepareRequest.type, (params, cancel) => {
                        return handler(params, cancel, this.attachWorkDoneProgress(params), undefined);
                    });
                },
                onIncomingCalls: (handler) => {
                    const type = main$1.CallHierarchyIncomingCallsRequest.type;
                    this.connection.onRequest(type, (params, cancel) => {
                        return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
                    });
                },
                onOutgoingCalls: (handler) => {
                    const type = main$1.CallHierarchyOutgoingCallsRequest.type;
                    this.connection.onRequest(type, (params, cancel) => {
                        return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
                    });
                }
            };
        }
    };
};
exports.CallHierarchyFeature = CallHierarchyFeature;

});

var showDocument = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowDocumentFeature = void 0;

const ShowDocumentFeature = (Base) => {
    return class extends Base {
        showDocument(params) {
            return this.connection.sendRequest(main$1.ShowDocumentRequest.type, params);
        }
    };
};
exports.ShowDocumentFeature = ShowDocumentFeature;

});

var fileOperations = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileOperationsFeature = void 0;

const FileOperationsFeature = (Base) => {
    return class extends Base {
        onDidCreateFiles(handler) {
            this.connection.onNotification(main$1.DidCreateFilesNotification.type, (params) => {
                handler(params);
            });
        }
        onDidRenameFiles(handler) {
            this.connection.onNotification(main$1.DidRenameFilesNotification.type, (params) => {
                handler(params);
            });
        }
        onDidDeleteFiles(handler) {
            this.connection.onNotification(main$1.DidDeleteFilesNotification.type, (params) => {
                handler(params);
            });
        }
        onWillCreateFiles(handler) {
            return this.connection.onRequest(main$1.WillCreateFilesRequest.type, (params, cancel) => {
                return handler(params, cancel);
            });
        }
        onWillRenameFiles(handler) {
            return this.connection.onRequest(main$1.WillRenameFilesRequest.type, (params, cancel) => {
                return handler(params, cancel);
            });
        }
        onWillDeleteFiles(handler) {
            return this.connection.onRequest(main$1.WillDeleteFilesRequest.type, (params, cancel) => {
                return handler(params, cancel);
            });
        }
    };
};
exports.FileOperationsFeature = FileOperationsFeature;

});

var linkedEditingRange = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedEditingRangeFeature = void 0;

const LinkedEditingRangeFeature = (Base) => {
    return class extends Base {
        onLinkedEditingRange(handler) {
            this.connection.onRequest(main$1.LinkedEditingRangeRequest.type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), undefined);
            });
        }
    };
};
exports.LinkedEditingRangeFeature = LinkedEditingRangeFeature;

});

var moniker = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonikerFeature = void 0;

const MonikerFeature = (Base) => {
    return class extends Base {
        get moniker() {
            return {
                on: (handler) => {
                    const type = main$1.MonikerRequest.type;
                    this.connection.onRequest(type, (params, cancel) => {
                        return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
                    });
                },
            };
        }
    };
};
exports.MonikerFeature = MonikerFeature;

});

var server = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConnection = exports.combineFeatures = exports.combineLanguagesFeatures = exports.combineWorkspaceFeatures = exports.combineWindowFeatures = exports.combineClientFeatures = exports.combineTracerFeatures = exports.combineTelemetryFeatures = exports.combineConsoleFeatures = exports._LanguagesImpl = exports.BulkUnregistration = exports.BulkRegistration = exports.ErrorMessageTracker = exports.TextDocuments = void 0;












function null2Undefined(value) {
    if (value === null) {
        return undefined;
    }
    return value;
}
/**
 * A manager for simple text documents
 */
class TextDocuments {
    /**
     * Create a new text document manager.
     */
    constructor(configuration) {
        this._documents = Object.create(null);
        this._configuration = configuration;
        this._onDidChangeContent = new main$1.Emitter();
        this._onDidOpen = new main$1.Emitter();
        this._onDidClose = new main$1.Emitter();
        this._onDidSave = new main$1.Emitter();
        this._onWillSave = new main$1.Emitter();
    }
    /**
     * An event that fires when a text document managed by this manager
     * has been opened or the content changes.
     */
    get onDidChangeContent() {
        return this._onDidChangeContent.event;
    }
    /**
     * An event that fires when a text document managed by this manager
     * has been opened.
     */
    get onDidOpen() {
        return this._onDidOpen.event;
    }
    /**
     * An event that fires when a text document managed by this manager
     * will be saved.
     */
    get onWillSave() {
        return this._onWillSave.event;
    }
    /**
     * Sets a handler that will be called if a participant wants to provide
     * edits during a text document save.
     */
    onWillSaveWaitUntil(handler) {
        this._willSaveWaitUntil = handler;
    }
    /**
     * An event that fires when a text document managed by this manager
     * has been saved.
     */
    get onDidSave() {
        return this._onDidSave.event;
    }
    /**
     * An event that fires when a text document managed by this manager
     * has been closed.
     */
    get onDidClose() {
        return this._onDidClose.event;
    }
    /**
     * Returns the document for the given URI. Returns undefined if
     * the document is not managed by this instance.
     *
     * @param uri The text document's URI to retrieve.
     * @return the text document or `undefined`.
     */
    get(uri) {
        return this._documents[uri];
    }
    /**
     * Returns all text documents managed by this instance.
     *
     * @return all text documents.
     */
    all() {
        return Object.keys(this._documents).map(key => this._documents[key]);
    }
    /**
     * Returns the URIs of all text documents managed by this instance.
     *
     * @return the URI's of all text documents.
     */
    keys() {
        return Object.keys(this._documents);
    }
    /**
     * Listens for `low level` notification on the given connection to
     * update the text documents managed by this instance.
     *
     * Please note that the connection only provides handlers not an event model. Therefore
     * listening on a connection will overwrite the following handlers on a connection:
     * `onDidOpenTextDocument`, `onDidChangeTextDocument`, `onDidCloseTextDocument`,
     * `onWillSaveTextDocument`, `onWillSaveTextDocumentWaitUntil` and `onDidSaveTextDocument`.
     *
     * Use the corresponding events on the TextDocuments instance instead.
     *
     * @param connection The connection to listen on.
     */
    listen(connection) {
        connection.__textDocumentSync = main$1.TextDocumentSyncKind.Full;
        connection.onDidOpenTextDocument((event) => {
            let td = event.textDocument;
            let document = this._configuration.create(td.uri, td.languageId, td.version, td.text);
            this._documents[td.uri] = document;
            let toFire = Object.freeze({ document });
            this._onDidOpen.fire(toFire);
            this._onDidChangeContent.fire(toFire);
        });
        connection.onDidChangeTextDocument((event) => {
            let td = event.textDocument;
            let changes = event.contentChanges;
            if (changes.length === 0) {
                return;
            }
            let document = this._documents[td.uri];
            const { version } = td;
            if (version === null || version === undefined) {
                throw new Error(`Received document change event for ${td.uri} without valid version identifier`);
            }
            document = this._configuration.update(document, changes, version);
            this._documents[td.uri] = document;
            this._onDidChangeContent.fire(Object.freeze({ document }));
        });
        connection.onDidCloseTextDocument((event) => {
            let document = this._documents[event.textDocument.uri];
            if (document) {
                delete this._documents[event.textDocument.uri];
                this._onDidClose.fire(Object.freeze({ document }));
            }
        });
        connection.onWillSaveTextDocument((event) => {
            let document = this._documents[event.textDocument.uri];
            if (document) {
                this._onWillSave.fire(Object.freeze({ document, reason: event.reason }));
            }
        });
        connection.onWillSaveTextDocumentWaitUntil((event, token) => {
            let document = this._documents[event.textDocument.uri];
            if (document && this._willSaveWaitUntil) {
                return this._willSaveWaitUntil(Object.freeze({ document, reason: event.reason }), token);
            }
            else {
                return [];
            }
        });
        connection.onDidSaveTextDocument((event) => {
            let document = this._documents[event.textDocument.uri];
            if (document) {
                this._onDidSave.fire(Object.freeze({ document }));
            }
        });
    }
}
exports.TextDocuments = TextDocuments;
/**
 * Helps tracking error message. Equal occurrences of the same
 * message are only stored once. This class is for example
 * useful if text documents are validated in a loop and equal
 * error message should be folded into one.
 */
class ErrorMessageTracker {
    constructor() {
        this._messages = Object.create(null);
    }
    /**
     * Add a message to the tracker.
     *
     * @param message The message to add.
     */
    add(message) {
        let count = this._messages[message];
        if (!count) {
            count = 0;
        }
        count++;
        this._messages[message] = count;
    }
    /**
     * Send all tracked messages to the connection's window.
     *
     * @param connection The connection established between client and server.
     */
    sendErrors(connection) {
        Object.keys(this._messages).forEach(message => {
            connection.window.showErrorMessage(message);
        });
    }
}
exports.ErrorMessageTracker = ErrorMessageTracker;
class RemoteConsoleImpl {
    constructor() {
    }
    rawAttach(connection) {
        this._rawConnection = connection;
    }
    attach(connection) {
        this._connection = connection;
    }
    get connection() {
        if (!this._connection) {
            throw new Error('Remote is not attached to a connection yet.');
        }
        return this._connection;
    }
    fillServerCapabilities(_capabilities) {
    }
    initialize(_capabilities) {
    }
    error(message) {
        this.send(main$1.MessageType.Error, message);
    }
    warn(message) {
        this.send(main$1.MessageType.Warning, message);
    }
    info(message) {
        this.send(main$1.MessageType.Info, message);
    }
    log(message) {
        this.send(main$1.MessageType.Log, message);
    }
    send(type, message) {
        if (this._rawConnection) {
            this._rawConnection.sendNotification(main$1.LogMessageNotification.type, { type, message });
        }
    }
}
class _RemoteWindowImpl {
    constructor() {
    }
    attach(connection) {
        this._connection = connection;
    }
    get connection() {
        if (!this._connection) {
            throw new Error('Remote is not attached to a connection yet.');
        }
        return this._connection;
    }
    initialize(_capabilities) {
    }
    fillServerCapabilities(_capabilities) {
    }
    showErrorMessage(message, ...actions) {
        let params = { type: main$1.MessageType.Error, message, actions };
        return this.connection.sendRequest(main$1.ShowMessageRequest.type, params).then(null2Undefined);
    }
    showWarningMessage(message, ...actions) {
        let params = { type: main$1.MessageType.Warning, message, actions };
        return this.connection.sendRequest(main$1.ShowMessageRequest.type, params).then(null2Undefined);
    }
    showInformationMessage(message, ...actions) {
        let params = { type: main$1.MessageType.Info, message, actions };
        return this.connection.sendRequest(main$1.ShowMessageRequest.type, params).then(null2Undefined);
    }
}
const RemoteWindowImpl = showDocument.ShowDocumentFeature(progress.ProgressFeature(_RemoteWindowImpl));
(function (BulkRegistration) {
    /**
     * Creates a new bulk registration.
     * @return an empty bulk registration.
     */
    function create() {
        return new BulkRegistrationImpl();
    }
    BulkRegistration.create = create;
})(exports.BulkRegistration || (exports.BulkRegistration = {}));
class BulkRegistrationImpl {
    constructor() {
        this._registrations = [];
        this._registered = new Set();
    }
    add(type, registerOptions) {
        const method = is.string(type) ? type : type.method;
        if (this._registered.has(method)) {
            throw new Error(`${method} is already added to this registration`);
        }
        const id = uuid.generateUuid();
        this._registrations.push({
            id: id,
            method: method,
            registerOptions: registerOptions || {}
        });
        this._registered.add(method);
    }
    asRegistrationParams() {
        return {
            registrations: this._registrations
        };
    }
}
(function (BulkUnregistration) {
    function create() {
        return new BulkUnregistrationImpl(undefined, []);
    }
    BulkUnregistration.create = create;
})(exports.BulkUnregistration || (exports.BulkUnregistration = {}));
class BulkUnregistrationImpl {
    constructor(_connection, unregistrations) {
        this._connection = _connection;
        this._unregistrations = new Map();
        unregistrations.forEach(unregistration => {
            this._unregistrations.set(unregistration.method, unregistration);
        });
    }
    get isAttached() {
        return !!this._connection;
    }
    attach(connection) {
        this._connection = connection;
    }
    add(unregistration) {
        this._unregistrations.set(unregistration.method, unregistration);
    }
    dispose() {
        let unregistrations = [];
        for (let unregistration of this._unregistrations.values()) {
            unregistrations.push(unregistration);
        }
        let params = {
            unregisterations: unregistrations
        };
        this._connection.sendRequest(main$1.UnregistrationRequest.type, params).then(undefined, (_error) => {
            this._connection.console.info(`Bulk unregistration failed.`);
        });
    }
    disposeSingle(arg) {
        const method = is.string(arg) ? arg : arg.method;
        const unregistration = this._unregistrations.get(method);
        if (!unregistration) {
            return false;
        }
        let params = {
            unregisterations: [unregistration]
        };
        this._connection.sendRequest(main$1.UnregistrationRequest.type, params).then(() => {
            this._unregistrations.delete(method);
        }, (_error) => {
            this._connection.console.info(`Un-registering request handler for ${unregistration.id} failed.`);
        });
        return true;
    }
}
class RemoteClientImpl {
    attach(connection) {
        this._connection = connection;
    }
    get connection() {
        if (!this._connection) {
            throw new Error('Remote is not attached to a connection yet.');
        }
        return this._connection;
    }
    initialize(_capabilities) {
    }
    fillServerCapabilities(_capabilities) {
    }
    register(typeOrRegistrations, registerOptionsOrType, registerOptions) {
        if (typeOrRegistrations instanceof BulkRegistrationImpl) {
            return this.registerMany(typeOrRegistrations);
        }
        else if (typeOrRegistrations instanceof BulkUnregistrationImpl) {
            return this.registerSingle1(typeOrRegistrations, registerOptionsOrType, registerOptions);
        }
        else {
            return this.registerSingle2(typeOrRegistrations, registerOptionsOrType);
        }
    }
    registerSingle1(unregistration, type, registerOptions) {
        const method = is.string(type) ? type : type.method;
        const id = uuid.generateUuid();
        let params = {
            registrations: [{ id, method, registerOptions: registerOptions || {} }]
        };
        if (!unregistration.isAttached) {
            unregistration.attach(this.connection);
        }
        return this.connection.sendRequest(main$1.RegistrationRequest.type, params).then((_result) => {
            unregistration.add({ id: id, method: method });
            return unregistration;
        }, (_error) => {
            this.connection.console.info(`Registering request handler for ${method} failed.`);
            return Promise.reject(_error);
        });
    }
    registerSingle2(type, registerOptions) {
        const method = is.string(type) ? type : type.method;
        const id = uuid.generateUuid();
        let params = {
            registrations: [{ id, method, registerOptions: registerOptions || {} }]
        };
        return this.connection.sendRequest(main$1.RegistrationRequest.type, params).then((_result) => {
            return main$1.Disposable.create(() => {
                this.unregisterSingle(id, method);
            });
        }, (_error) => {
            this.connection.console.info(`Registering request handler for ${method} failed.`);
            return Promise.reject(_error);
        });
    }
    unregisterSingle(id, method) {
        let params = {
            unregisterations: [{ id, method }]
        };
        return this.connection.sendRequest(main$1.UnregistrationRequest.type, params).then(undefined, (_error) => {
            this.connection.console.info(`Un-registering request handler for ${id} failed.`);
        });
    }
    registerMany(registrations) {
        let params = registrations.asRegistrationParams();
        return this.connection.sendRequest(main$1.RegistrationRequest.type, params).then(() => {
            return new BulkUnregistrationImpl(this._connection, params.registrations.map(registration => { return { id: registration.id, method: registration.method }; }));
        }, (_error) => {
            this.connection.console.info(`Bulk registration failed.`);
            return Promise.reject(_error);
        });
    }
}
class _RemoteWorkspaceImpl {
    constructor() {
    }
    attach(connection) {
        this._connection = connection;
    }
    get connection() {
        if (!this._connection) {
            throw new Error('Remote is not attached to a connection yet.');
        }
        return this._connection;
    }
    initialize(_capabilities) {
    }
    fillServerCapabilities(_capabilities) {
    }
    applyEdit(paramOrEdit) {
        function isApplyWorkspaceEditParams(value) {
            return value && !!value.edit;
        }
        let params = isApplyWorkspaceEditParams(paramOrEdit) ? paramOrEdit : { edit: paramOrEdit };
        return this.connection.sendRequest(main$1.ApplyWorkspaceEditRequest.type, params);
    }
}
const RemoteWorkspaceImpl = fileOperations.FileOperationsFeature(workspaceFolders.WorkspaceFoldersFeature(configuration.ConfigurationFeature(_RemoteWorkspaceImpl)));
class TracerImpl {
    constructor() {
        this._trace = main$1.Trace.Off;
    }
    attach(connection) {
        this._connection = connection;
    }
    get connection() {
        if (!this._connection) {
            throw new Error('Remote is not attached to a connection yet.');
        }
        return this._connection;
    }
    initialize(_capabilities) {
    }
    fillServerCapabilities(_capabilities) {
    }
    set trace(value) {
        this._trace = value;
    }
    log(message, verbose) {
        if (this._trace === main$1.Trace.Off) {
            return;
        }
        this.connection.sendNotification(main$1.LogTraceNotification.type, {
            message: message,
            verbose: this._trace === main$1.Trace.Verbose ? verbose : undefined
        });
    }
}
class TelemetryImpl {
    constructor() {
    }
    attach(connection) {
        this._connection = connection;
    }
    get connection() {
        if (!this._connection) {
            throw new Error('Remote is not attached to a connection yet.');
        }
        return this._connection;
    }
    initialize(_capabilities) {
    }
    fillServerCapabilities(_capabilities) {
    }
    logEvent(data) {
        this.connection.sendNotification(main$1.TelemetryEventNotification.type, data);
    }
}
class _LanguagesImpl {
    constructor() {
    }
    attach(connection) {
        this._connection = connection;
    }
    get connection() {
        if (!this._connection) {
            throw new Error('Remote is not attached to a connection yet.');
        }
        return this._connection;
    }
    initialize(_capabilities) {
    }
    fillServerCapabilities(_capabilities) {
    }
    attachWorkDoneProgress(params) {
        return progress.attachWorkDone(this.connection, params);
    }
    attachPartialResultProgress(_type, params) {
        return progress.attachPartialResult(this.connection, params);
    }
}
exports._LanguagesImpl = _LanguagesImpl;
const LanguagesImpl = moniker.MonikerFeature(linkedEditingRange.LinkedEditingRangeFeature(semanticTokens.SemanticTokensFeature(callHierarchy.CallHierarchyFeature(_LanguagesImpl))));
function combineConsoleFeatures(one, two) {
    return function (Base) {
        return two(one(Base));
    };
}
exports.combineConsoleFeatures = combineConsoleFeatures;
function combineTelemetryFeatures(one, two) {
    return function (Base) {
        return two(one(Base));
    };
}
exports.combineTelemetryFeatures = combineTelemetryFeatures;
function combineTracerFeatures(one, two) {
    return function (Base) {
        return two(one(Base));
    };
}
exports.combineTracerFeatures = combineTracerFeatures;
function combineClientFeatures(one, two) {
    return function (Base) {
        return two(one(Base));
    };
}
exports.combineClientFeatures = combineClientFeatures;
function combineWindowFeatures(one, two) {
    return function (Base) {
        return two(one(Base));
    };
}
exports.combineWindowFeatures = combineWindowFeatures;
function combineWorkspaceFeatures(one, two) {
    return function (Base) {
        return two(one(Base));
    };
}
exports.combineWorkspaceFeatures = combineWorkspaceFeatures;
function combineLanguagesFeatures(one, two) {
    return function (Base) {
        return two(one(Base));
    };
}
exports.combineLanguagesFeatures = combineLanguagesFeatures;
function combineFeatures(one, two) {
    function combine(one, two, func) {
        if (one && two) {
            return func(one, two);
        }
        else if (one) {
            return one;
        }
        else {
            return two;
        }
    }
    let result = {
        __brand: 'features',
        console: combine(one.console, two.console, combineConsoleFeatures),
        tracer: combine(one.tracer, two.tracer, combineTracerFeatures),
        telemetry: combine(one.telemetry, two.telemetry, combineTelemetryFeatures),
        client: combine(one.client, two.client, combineClientFeatures),
        window: combine(one.window, two.window, combineWindowFeatures),
        workspace: combine(one.workspace, two.workspace, combineWorkspaceFeatures)
    };
    return result;
}
exports.combineFeatures = combineFeatures;
function createConnection(connectionFactory, watchDog, factories) {
    const logger = (factories && factories.console ? new (factories.console(RemoteConsoleImpl))() : new RemoteConsoleImpl());
    const connection = connectionFactory(logger);
    logger.rawAttach(connection);
    const tracer = (factories && factories.tracer ? new (factories.tracer(TracerImpl))() : new TracerImpl());
    const telemetry = (factories && factories.telemetry ? new (factories.telemetry(TelemetryImpl))() : new TelemetryImpl());
    const client = (factories && factories.client ? new (factories.client(RemoteClientImpl))() : new RemoteClientImpl());
    const remoteWindow = (factories && factories.window ? new (factories.window(RemoteWindowImpl))() : new RemoteWindowImpl());
    const workspace = (factories && factories.workspace ? new (factories.workspace(RemoteWorkspaceImpl))() : new RemoteWorkspaceImpl());
    const languages = (factories && factories.languages ? new (factories.languages(LanguagesImpl))() : new LanguagesImpl());
    const allRemotes = [logger, tracer, telemetry, client, remoteWindow, workspace, languages];
    function asPromise(value) {
        if (value instanceof Promise) {
            return value;
        }
        else if (is.thenable(value)) {
            return new Promise((resolve, reject) => {
                value.then((resolved) => resolve(resolved), (error) => reject(error));
            });
        }
        else {
            return Promise.resolve(value);
        }
    }
    let shutdownHandler = undefined;
    let initializeHandler = undefined;
    let exitHandler = undefined;
    let protocolConnection = {
        listen: () => connection.listen(),
        sendRequest: (type, ...params) => connection.sendRequest(is.string(type) ? type : type.method, ...params),
        onRequest: (type, handler) => connection.onRequest(type, handler),
        sendNotification: (type, param) => {
            const method = is.string(type) ? type : type.method;
            if (arguments.length === 1) {
                connection.sendNotification(method);
            }
            else {
                connection.sendNotification(method, param);
            }
        },
        onNotification: (type, handler) => connection.onNotification(type, handler),
        onProgress: connection.onProgress,
        sendProgress: connection.sendProgress,
        onInitialize: (handler) => initializeHandler = handler,
        onInitialized: (handler) => connection.onNotification(main$1.InitializedNotification.type, handler),
        onShutdown: (handler) => shutdownHandler = handler,
        onExit: (handler) => exitHandler = handler,
        get console() { return logger; },
        get telemetry() { return telemetry; },
        get tracer() { return tracer; },
        get client() { return client; },
        get window() { return remoteWindow; },
        get workspace() { return workspace; },
        get languages() { return languages; },
        onDidChangeConfiguration: (handler) => connection.onNotification(main$1.DidChangeConfigurationNotification.type, handler),
        onDidChangeWatchedFiles: (handler) => connection.onNotification(main$1.DidChangeWatchedFilesNotification.type, handler),
        __textDocumentSync: undefined,
        onDidOpenTextDocument: (handler) => connection.onNotification(main$1.DidOpenTextDocumentNotification.type, handler),
        onDidChangeTextDocument: (handler) => connection.onNotification(main$1.DidChangeTextDocumentNotification.type, handler),
        onDidCloseTextDocument: (handler) => connection.onNotification(main$1.DidCloseTextDocumentNotification.type, handler),
        onWillSaveTextDocument: (handler) => connection.onNotification(main$1.WillSaveTextDocumentNotification.type, handler),
        onWillSaveTextDocumentWaitUntil: (handler) => connection.onRequest(main$1.WillSaveTextDocumentWaitUntilRequest.type, handler),
        onDidSaveTextDocument: (handler) => connection.onNotification(main$1.DidSaveTextDocumentNotification.type, handler),
        sendDiagnostics: (params) => connection.sendNotification(main$1.PublishDiagnosticsNotification.type, params),
        onHover: (handler) => connection.onRequest(main$1.HoverRequest.type, (params, cancel) => {
            return handler(params, cancel, progress.attachWorkDone(connection, params), undefined);
        }),
        onCompletion: (handler) => connection.onRequest(main$1.CompletionRequest.type, (params, cancel) => {
            return handler(params, cancel, progress.attachWorkDone(connection, params), progress.attachPartialResult(connection, params));
        }),
        onCompletionResolve: (handler) => connection.onRequest(main$1.CompletionResolveRequest.type, handler),
        onSignatureHelp: (handler) => connection.onRequest(main$1.SignatureHelpRequest.type, (params, cancel) => {
            return handler(params, cancel, progress.attachWorkDone(connection, params), undefined);
        }),
        onDeclaration: (handler) => connection.onRequest(main$1.DeclarationRequest.type, (params, cancel) => {
            return handler(params, cancel, progress.attachWorkDone(connection, params), progress.attachPartialResult(connection, params));
        }),
        onDefinition: (handler) => connection.onRequest(main$1.DefinitionRequest.type, (params, cancel) => {
            return handler(params, cancel, progress.attachWorkDone(connection, params), progress.attachPartialResult(connection, params));
        }),
        onTypeDefinition: (handler) => connection.onRequest(main$1.TypeDefinitionRequest.type, (params, cancel) => {
            return handler(params, cancel, progress.attachWorkDone(connection, params), progress.attachPartialResult(connection, params));
        }),
        onImplementation: (handler) => connection.onRequest(main$1.ImplementationRequest.type, (params, cancel) => {
            return handler(params, cancel, progress.attachWorkDone(connection, params), progress.attachPartialResult(connection, params));
        }),
        onReferences: (handler) => connection.onRequest(main$1.ReferencesRequest.type, (params, cancel) => {
            return handler(params, cancel, progress.attachWorkDone(connection, params), progress.attachPartialResult(connection, params));
        }),
        onDocumentHighlight: (handler) => connection.onRequest(main$1.DocumentHighlightRequest.type, (params, cancel) => {
            return handler(params, cancel, progress.attachWorkDone(connection, params), progress.attachPartialResult(connection, params));
        }),
        onDocumentSymbol: (handler) => connection.onRequest(main$1.DocumentSymbolRequest.type, (params, cancel) => {
            return handler(params, cancel, progress.attachWorkDone(connection, params), progress.attachPartialResult(connection, params));
        }),
        onWorkspaceSymbol: (handler) => connection.onRequest(main$1.WorkspaceSymbolRequest.type, (params, cancel) => {
            return handler(params, cancel, progress.attachWorkDone(connection, params), progress.attachPartialResult(connection, params));
        }),
        onCodeAction: (handler) => connection.onRequest(main$1.CodeActionRequest.type, (params, cancel) => {
            return handler(params, cancel, progress.attachWorkDone(connection, params), progress.attachPartialResult(connection, params));
        }),
        onCodeActionResolve: (handler) => connection.onRequest(main$1.CodeActionResolveRequest.type, (params, cancel) => {
            return handler(params, cancel);
        }),
        onCodeLens: (handler) => connection.onRequest(main$1.CodeLensRequest.type, (params, cancel) => {
            return handler(params, cancel, progress.attachWorkDone(connection, params), progress.attachPartialResult(connection, params));
        }),
        onCodeLensResolve: (handler) => connection.onRequest(main$1.CodeLensResolveRequest.type, (params, cancel) => {
            return handler(params, cancel);
        }),
        onDocumentFormatting: (handler) => connection.onRequest(main$1.DocumentFormattingRequest.type, (params, cancel) => {
            return handler(params, cancel, progress.attachWorkDone(connection, params), undefined);
        }),
        onDocumentRangeFormatting: (handler) => connection.onRequest(main$1.DocumentRangeFormattingRequest.type, (params, cancel) => {
            return handler(params, cancel, progress.attachWorkDone(connection, params), undefined);
        }),
        onDocumentOnTypeFormatting: (handler) => connection.onRequest(main$1.DocumentOnTypeFormattingRequest.type, (params, cancel) => {
            return handler(params, cancel);
        }),
        onRenameRequest: (handler) => connection.onRequest(main$1.RenameRequest.type, (params, cancel) => {
            return handler(params, cancel, progress.attachWorkDone(connection, params), undefined);
        }),
        onPrepareRename: (handler) => connection.onRequest(main$1.PrepareRenameRequest.type, (params, cancel) => {
            return handler(params, cancel);
        }),
        onDocumentLinks: (handler) => connection.onRequest(main$1.DocumentLinkRequest.type, (params, cancel) => {
            return handler(params, cancel, progress.attachWorkDone(connection, params), progress.attachPartialResult(connection, params));
        }),
        onDocumentLinkResolve: (handler) => connection.onRequest(main$1.DocumentLinkResolveRequest.type, (params, cancel) => {
            return handler(params, cancel);
        }),
        onDocumentColor: (handler) => connection.onRequest(main$1.DocumentColorRequest.type, (params, cancel) => {
            return handler(params, cancel, progress.attachWorkDone(connection, params), progress.attachPartialResult(connection, params));
        }),
        onColorPresentation: (handler) => connection.onRequest(main$1.ColorPresentationRequest.type, (params, cancel) => {
            return handler(params, cancel, progress.attachWorkDone(connection, params), progress.attachPartialResult(connection, params));
        }),
        onFoldingRanges: (handler) => connection.onRequest(main$1.FoldingRangeRequest.type, (params, cancel) => {
            return handler(params, cancel, progress.attachWorkDone(connection, params), progress.attachPartialResult(connection, params));
        }),
        onSelectionRanges: (handler) => connection.onRequest(main$1.SelectionRangeRequest.type, (params, cancel) => {
            return handler(params, cancel, progress.attachWorkDone(connection, params), progress.attachPartialResult(connection, params));
        }),
        onExecuteCommand: (handler) => connection.onRequest(main$1.ExecuteCommandRequest.type, (params, cancel) => {
            return handler(params, cancel, progress.attachWorkDone(connection, params), undefined);
        }),
        dispose: () => connection.dispose()
    };
    for (let remote of allRemotes) {
        remote.attach(protocolConnection);
    }
    connection.onRequest(main$1.InitializeRequest.type, (params) => {
        watchDog.initialize(params);
        if (is.string(params.trace)) {
            tracer.trace = main$1.Trace.fromString(params.trace);
        }
        for (let remote of allRemotes) {
            remote.initialize(params.capabilities);
        }
        if (initializeHandler) {
            let result = initializeHandler(params, new main$1.CancellationTokenSource().token, progress.attachWorkDone(connection, params), undefined);
            return asPromise(result).then((value) => {
                if (value instanceof main$1.ResponseError) {
                    return value;
                }
                let result = value;
                if (!result) {
                    result = { capabilities: {} };
                }
                let capabilities = result.capabilities;
                if (!capabilities) {
                    capabilities = {};
                    result.capabilities = capabilities;
                }
                if (capabilities.textDocumentSync === undefined || capabilities.textDocumentSync === null) {
                    capabilities.textDocumentSync = is.number(protocolConnection.__textDocumentSync) ? protocolConnection.__textDocumentSync : main$1.TextDocumentSyncKind.None;
                }
                else if (!is.number(capabilities.textDocumentSync) && !is.number(capabilities.textDocumentSync.change)) {
                    capabilities.textDocumentSync.change = is.number(protocolConnection.__textDocumentSync) ? protocolConnection.__textDocumentSync : main$1.TextDocumentSyncKind.None;
                }
                for (let remote of allRemotes) {
                    remote.fillServerCapabilities(capabilities);
                }
                return result;
            });
        }
        else {
            let result = { capabilities: { textDocumentSync: main$1.TextDocumentSyncKind.None } };
            for (let remote of allRemotes) {
                remote.fillServerCapabilities(result.capabilities);
            }
            return result;
        }
    });
    connection.onRequest(main$1.ShutdownRequest.type, () => {
        watchDog.shutdownReceived = true;
        if (shutdownHandler) {
            return shutdownHandler(new main$1.CancellationTokenSource().token);
        }
        else {
            return undefined;
        }
    });
    connection.onNotification(main$1.ExitNotification.type, () => {
        try {
            if (exitHandler) {
                exitHandler();
            }
        }
        finally {
            if (watchDog.shutdownReceived) {
                watchDog.exit(0);
            }
            else {
                watchDog.exit(1);
            }
        }
    });
    connection.onNotification(main$1.SetTraceNotification.type, (params) => {
        tracer.trace = main$1.Trace.fromString(params.value);
    });
    return protocolConnection;
}
exports.createConnection = createConnection;

});

var proposed_diagnostic = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagnosticFeature = void 0;

const DiagnosticFeature = (Base) => {
    return class extends Base {
        get diagnostics() {
            return {
                refresh: () => {
                    return this.connection.sendRequest(main$1.Proposed.DiagnosticRefreshRequest.type);
                },
                on: (handler) => {
                    this.connection.onRequest(main$1.Proposed.DiagnosticRequest.type, (params, cancel) => {
                        return handler(params, cancel, this.attachWorkDoneProgress(params), undefined);
                    });
                }
            };
        }
    };
};
exports.DiagnosticFeature = DiagnosticFeature;

});

var api = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposedFeatures = exports.SemanticTokensBuilder = void 0;

Object.defineProperty(exports, "SemanticTokensBuilder", { enumerable: true, get: function () { return semanticTokens.SemanticTokensBuilder; } });
__exportStar(main$1, exports);
__exportStar(server, exports);
(function (ProposedFeatures) {
    ProposedFeatures.all = {
        __brand: 'features',
        languages: proposed_diagnostic.DiagnosticFeature
    };
})(exports.ProposedFeatures || (exports.ProposedFeatures = {}));

});

var browser$1 = main$1;

var main = createCommonjsModule(function (module, exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConnection = void 0;

__exportStar(browser$1, exports);
__exportStar(api, exports);
let _shutdownReceived = false;
const watchDog = {
    initialize: (_params) => {
    },
    get shutdownReceived() {
        return _shutdownReceived;
    },
    set shutdownReceived(value) {
        _shutdownReceived = value;
    },
    exit: (_code) => {
    }
};
function createConnection(arg1, arg2, arg3, arg4) {
    let factories;
    let reader;
    let writer;
    let options;
    if (arg1 !== void 0 && arg1.__brand === 'features') {
        factories = arg1;
        arg1 = arg2;
        arg2 = arg3;
        arg3 = arg4;
    }
    if (api.ConnectionStrategy.is(arg1) || api.ConnectionOptions.is(arg1)) {
        options = arg1;
    }
    else {
        reader = arg1;
        writer = arg2;
        options = arg3;
    }
    const connectionFactory = (logger) => {
        return api.createProtocolConnection(reader, writer, logger, options);
    };
    return api.createConnection(connectionFactory, watchDog, factories);
}
exports.createConnection = createConnection;

});

var browser = main;

/// <reference lib="dom" />

console.debug('Svelte Web server starting...');

const messageReader = new browser.BrowserMessageReader(self);
const messageWriter = new browser.BrowserMessageWriter(self);

const connection = browser.createConnection(messageReader, messageWriter);

const fsMap = new Map();

const system = createSystem(fsMap);

ts.sys = system;

startServerCommon({
    connection,
    system,
    htmlDataProvider: createDataProvider(htmlData)
});
