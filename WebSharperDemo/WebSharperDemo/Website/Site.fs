namespace Website

open IntelliFactory.Html
open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.Sitelets
open Slideshow

type Action =
    | Home
    | Crawler
    | Custom404
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
                Body = body context
            }

module Site =

    let ( => ) text url =
        A [HRef url] -< [Text text]

    let Links (ctx: Context<Action>) =
        UL [
            LI ["Slideshow"   => ctx.Link Slideshow]
            LI ["Web Crawler" => ctx.Link Crawler]
        ]

    let HomePage =
        Skin.WithTemplate "WebSharper Demo" <| fun ctx ->
            [
                Links ctx
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
                ]
            ]
//                <table id="table" class="table table-bordered table-striped">
//      <caption>1 Mot Cl&#233;</caption>
//      <tr>
//        <th>Combinaison</th>
//        <th>Occurence</th>
//        <th>Densit&#233;</th>
//      </tr>
//    </table>
        
    let Custom404Page =
        Skin.WithTemplate "WebSharper Slideshow | WebSharper Carousel" <| fun ctx ->
            [
                Div [
                    P [Text "The page you're trying to access doesn't exist."]
                    LI ["Home" => ctx.Link Home]
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
                ]
            ]

    let Main =
        Sitelet.Sum [
            Sitelet.Content "/"          Home HomePage
            Sitelet.Content "/Crawler"   Crawler CrawlerPage
            Sitelet.Content "/Custom404" Custom404 Custom404Page
            Sitelet.Content "/Slideshow" Slideshow SlideshowPage
        ]

type Website() =
    interface IWebsite<Action> with
        member this.Sitelet = Site.Main
        member this.Actions = [Home; Slideshow]

[<assembly: WebsiteAttribute(typeof<Website>)>]
do ()