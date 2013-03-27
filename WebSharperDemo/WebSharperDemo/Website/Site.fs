namespace Website

open IntelliFactory.WebSharper.Sitelets
open Model

module Site =

    open Controller

    let router : Router<Action> =
        Router.Table
            [
                Home, "/"
            ]
        <|>
        Router.Infer()

    let Main =
        {
            Controller = controller
            Router     = router
        }
    
type Website() =
    interface IWebsite<Action> with
        member this.Sitelet = Site.Main
        member this.Actions = []

[<assembly: WebsiteAttribute(typeof<Website>)>]
do ()