namespace Website

module Views =

    open IntelliFactory.Html
    open ExtSharper
    open Model
    open Utils.Server

    let mainTemplate = Skin.MakeDefaultTemplate "~/Main.html" Skin.LoadFrequency.Once 
    let withMainTemplate = Skin.WithTemplate<Action> mainTemplate

    let home =
        withMainTemplate "WebSharper Demos" "" <| fun ctx ->
            [
                navigation <| Some "Home"
                Div [new Forkme.Viewer()]
                Div [Class "row push"] -< [
                    Div [Class "span4"] -< [A [Class "btn btn-large home-btn"; HRef <| ctx.Link Slideshow]   -< [Text "Slideshow"]]
                    Div [Class "span4"] -< [A [Class "btn btn-large home-btn"; HRef <| ctx.Link Crawler]     -< [Text "Web Crawler"]]
                    Div [Class "span4"] -< [A [Class "btn btn-large home-btn"; HRef <| ctx.Link Html5Logo]   -< [Text "Canvas Drawing"]]
                ]
                Div [Class "row"] -< [
                    Div [Class "span4"] -< [A [Class "btn btn-large home-btn"; HRef <| ctx.Link Geolocation] -< [Text "Geolocation"]]
                ]
            ]

    let crawler =
        withMainTemplate "F# Web Crawler" "" <| fun ctx ->
            [
                navigation None
                Div [new Forkme.Viewer()]
                Div [Class "page-header"] -< [H1 [Text "F# Web Crawler"]]
                P [Text "Enter a URL for the crawler to use as a seed. For demo purposes, only the first 10 dicovered pages are displayed."]
                Div [new Crawler.Client.Viewer()]
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
        
    let custom404 =
        withMainTemplate "Error - Page Not Found" "" <| fun ctx ->
            [
                navigation None
                Div [new Forkme.Viewer()]
                Div [Text "The page you're trying to access doesn't exist."]
            ]

    let html5Logo =
        withMainTemplate "Drawing On The Canvas With WebSharper" "" <| fun ctx ->
            [
                navigation None
                Div [new Forkme.Viewer()]
                Div [Class "page-header"] -< [
                    H1 [Text "Drawing the HTML5 logo on the canvas"]
                ]
                Div [Class "offset3"] -< [new Html5Logo.Client.Viewer()]
            ]

    let slideshow =
        withMainTemplate "WebSharper Slideshow | WebSharper Carousel" "" <| fun ctx ->
            [
                navigation None
                Div [new Forkme.Viewer()]
                Div [Class "page-header"] -< [
                    H1 [Text "WebSharper Slideshow"]
                ]
                Div [Class "push"] -< [new Slideshow.Viewer ()]
            ]

    let geolocation =
        withMainTemplate "WebSharper Geolocation Demo" "" <| fun ctx ->
            [
                navigation None
                Div [new Forkme.Viewer()]
                Div [Class "page-header"] -< [
                    H1 [Text "Reverse geocoding with the Google Maps API"]
                    Small [Text "Accuracy depends on many factors (browser, device ...)"]
                ]
                Div [new Geolocation.Viewer ()]
            ]