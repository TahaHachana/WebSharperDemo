namespace Website

module Controller =

    open IntelliFactory.WebSharper.Sitelets
    open Model

    let controller =

        let handle =
            function
                | Home        -> Views.home
                | Crawler     -> Views.crawler
                | Custom404   -> Views.custom404
                | Geolocation -> Views.geolocation
                | Html5Logo   -> Views.html5Logo
                | Slideshow   -> Views.slideshow
                | Twitter     -> Views.twitter
                | Fantomas    -> Views.fantomas
        
        { Handle = handle }