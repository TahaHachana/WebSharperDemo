namespace Website

open IntelliFactory.Html
open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.Sitelets
open Slideshow

type Action =
    | Home
    | Crawler
    | Custom404
    | Html5Logo
    | Slideshow

module Skin =
    open System.Web

    let TemplateLoadFrequency =
        #if DEBUG
        Content.Template.PerRequest
        #else
        Content.Template.Once
        #endif

    type Page =
        {
            Title : string
            Body : list<Content.HtmlElement>
        }

    let MainTemplate =
        let path = HttpContext.Current.Server.MapPath("~/Main.html")
        Content.Template<Page>(path, TemplateLoadFrequency)
            .With("title", fun x -> x.Title)
            .With("body", fun x -> x.Body)

    let WithTemplate title body : Content<Action> =
        Content.WithTemplate MainTemplate <| fun context ->
            {
                Title = title
                Body  = body context
            }

module Site =

    let ( => ) text url =
        A [HRef url] -< [Text text]

    let Links (ctx: Context<Action>) =
        UL [
            LI ["Slideshow"      => ctx.Link Slideshow]
            LI ["Web Crawler"    => ctx.Link Crawler]
            LI ["Canvas Drawing" => ctx.Link Html5Logo]
        ]

//    let footer() =
//        HTML5.Footer [
//            P [Text "Powered by "]
//            A [HRef "http://www.websharper.com/"] -< [Text "WebSharper"]
//        ]

    let HomePage =
        Skin.WithTemplate "WebSharper Demo" <| fun ctx ->
            [
                Links ctx
//                footer()
            ]
    
    let CrawlerPage =
        Skin.WithTemplate "F# Web Crawler" <| fun ctx ->
            [
                Div [Class "span2"] -< [
                    LI ["Home" => ctx.Link Home]
                ]
                Div [Class "span10"] -< [
                    Div [Class "page-header"] -< [
                        H1 [Text "F# Web Crawler"]
                    ]
                    P [Text "Enter a URL for the crawler to use as a seed. For demo purposes, only the first 10 dicovered pages are displayed."]
                    Div [new Crawler.CrawlerFormViewer()]
                    Div [] -< [Img [Src "Images/Crawler/Loader.gif"; Class "loader"; Id "loader"]]
                    Div [] -< [
                        Table [Id "table"; Class "table table-bordered table-striped"] -< [
                            TR [] -< [
                                TH [Class "url"] -< [Text "URL"]
                                TH [Text "Status Code"]
                                TH [Text "Content Type"]
                            ]
                        ]
                    ]
//                    footer()
                ]
            ]
        
    let Custom404Page =
        Skin.WithTemplate "WebSharper Slideshow | WebSharper Carousel" <| fun ctx ->
            [
                Div [
                    P [Text "The page you're trying to access doesn't exist."]
                    LI ["Home" => ctx.Link Home]
//                    footer()
                ]
            ]

    let Html5LogoPage =
        Skin.WithTemplate "Drawing On The Canvas With WebSharper" <| fun ctx ->
            [
                Div [Class "span2"] -< [
                    LI ["Home" => ctx.Link Home]
                ]
                Div [Class "span10"] -< [
                    Div [Class "page-header"] -< [
                        H1 [Text "Drawing the HTML5 logo on the canvas"]
                    ]
                    Div [Class "offset3"] -< [new Html5Logo.Client.LogoViewer()]
//                    footer()
                ]
            ]

    let SlideshowPage =
        Skin.WithTemplate "WebSharper Slideshow | WebSharper Carousel" <| fun ctx ->
            [
                Div [Class "span2"] -< [
                    LI ["Home" => ctx.Link Home]
                ]
                Div [Class "span10"] -< [
                    Div [Class "page-header"] -< [
                        H1 [Text "WebSharper Slideshow"]
                    ]
                    Div [new SlideshowViewer ()]
//                    footer()
                ]
            ]

    let Main =
        Sitelet.Sum [
            Sitelet.Content "/"          Home HomePage
            Sitelet.Content "/Crawler"   Crawler CrawlerPage
            Sitelet.Content "/Custom404" Custom404 Custom404Page
            Sitelet.Content "/Html5Logo" Html5Logo Html5LogoPage
            Sitelet.Content "/Slideshow" Slideshow SlideshowPage
        ]

type Website() =
    interface IWebsite<Action> with
        member this.Sitelet = Site.Main
        member this.Actions = []

[<assembly: WebsiteAttribute(typeof<Website>)>]
do ()