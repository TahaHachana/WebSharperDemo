namespace Website

open IntelliFactory.WebSharper

module Html5Logo =
    
    module Client =

        open IntelliFactory.WebSharper.Html
        open IntelliFactory.WebSharper.Html5
        open IntelliFactory.WebSharper.JQuery

        [<JavaScript>]
        let drawLine (context : CanvasRenderingContext2D) x y = context.LineTo(x, y)
    
        [<JavaScript>]
        let drawPaths context coords =
            coords
            |> List.iter (fun (x, y) -> drawLine context x y)
            context.ClosePath()
            context.Fill()

        [<JavaScript>]
        let drawShape (context : CanvasRenderingContext2D) (fillStyle : string) moveTo coords =
            context.FillStyle <- fillStyle
            context.BeginPath()
            context.MoveTo moveTo
            drawPaths context coords

        [<JavaScript>]
        let canvas() =
            let element = HTML5.Tags.Canvas [Attr.Style "display: none;"]
            let canvas  = As<CanvasElement> element.Dom
            canvas.Height <- 400
            canvas.Width  <- 600
            let context = canvas.GetContext("2d")

            // draw the HTML letters
            context.Font <- "60px 'Gill Sans Ultra Bold'"
            context.FillText("HTML", 40., 60.)
            // move down
            context.Translate(0., 70.)
            // draw the background
            drawShape context "#E34C26" (44., 255.) [(22.0, 5.0); (267.0, 5.0); (244.0, 255.0); (144.0, 283.0)]
            // draw the shield-shaped right part
            drawShape context "#F06529" (144., 262.) [(225.0, 239.0); (244.0, 25.0); (144.0, 25.0)]
            // draw the 5
            drawShape context "#EBEBEB" (144., 118.) [(103.0, 118.0); (101.0, 87.0); (144.0, 87.0); (144.0, 56.0); (67.0, 56.0); (75.0, 149.0); (144.0, 149.0)]
            drawShape context "#EBEBEB" (144., 198.) [(110.0, 189.0); (108.0, 164.0); (77.0, 164.0); (81.0, 212.0); (144.0, 230.0)]
            drawShape context "#FFFFFF" (144., 118.) [(144.0, 149.0); (182.0, 149.0); (178.0, 189.0); (144.0, 198.0); (144.0, 230.0); (207.0, 212.0); (215.0, 118.0)]
            drawShape context "#FFFFFF" (144., 56.)  [(144.0, 87.0); (218.0, 87.0); (221.0, 56.0)]

            element
            |>! OnAfterRender (fun x -> JQuery.Of(x.Dom).FadeIn(1000.).Ignore)
                
        type LogoViewer() =

            inherit Web.Control()

            [<JavaScript>]
            override __.Body = canvas() :> _

