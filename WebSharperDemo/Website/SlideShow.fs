namespace Website

open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.Html
open IntelliFactory.WebSharper.JQuery

module Slideshow =

    type AnimationConfig = { left : int }

    type Slide =
        {
            Src         : string
            Alt         : string
            Heading     : string
            Description : string
            Href        : string
        }

    [<JavaScriptAttribute>]
    let animateSlideshow (animationSpeed : int) interval =
        let animationAllowed = ref true
        let slider = JQuery.Of("#slidesContainer")
        let frameWidth = slider.Width()
        let frameWidth' = "-" + string frameWidth + "px"
        let itemCount = JQuery.Of(".slide").Length
        let width = string (itemCount * frameWidth) + "px"
            
        slider.Css("width", width).Ignore
        JQuery.Of(".slide").Filter(":first")
            .Before(JQuery.Of(".slide").Filter(":last")).Ignore
        slider.Css("left", frameWidth').Ignore
               
        let slideLeft () =
            animationAllowed := false
            JQuery.Of(".slide").Filter(":last")
                .After(JQuery.Of(".slide").Filter(":first")).Ignore
            slider.Css("left", "0px").Ignore
            slider.Animate(
                {left = - frameWidth},
                animationSpeed,
                (fun () -> animationAllowed := true)).Ignore

        let slideRight () =
            animationAllowed := false
            slider.Animate(
                {left = 0},
                animationSpeed,
                (fun () ->
                    slider.Css("left", frameWidth').Ignore
                    JQuery.Of(".slide").Filter(":first")
                        .Before(JQuery.Of(".slide").Filter(":last")).Ignore
                    animationAllowed := true)).Ignore

        let autoSlide () =
            match !animationAllowed with
                | false -> ()
                | true  -> slideLeft ()

        JavaScript.SetInterval autoSlide interval |> ignore 
            
        JQuery.Of(".slide, .carouselControl").Mouseenter(fun _ _ -> animationAllowed := false).Ignore
        JQuery.Of(".slide").Mouseout(fun _ _ -> animationAllowed := true).Ignore

        JQuery.Of(".carouselControl").Click(fun x _ ->
            JQuery.Of(x).Attr("id") = "rightControl"
            |> function
                | false -> slideLeft ()
                | true  -> slideRight ()).Ignore

    [<JavaScriptAttribute>]
    let slideDiv (slide : Slide) height width =
        Div [Attr.Class "slide"] -< [
            Img [Src slide.Src; Alt slide.Alt; Height height; Width width]
            Div [Attr.Class "carouselCaption"] -< [
                H4 [Text slide.Heading]
                P [Text slide.Description]
                A [Text "Click Here"; HRef slide.Href]
            ]
        ]
    
    [<JavaScriptAttribute>]
    let slides =
        [
            {Src = "Images/Slideshow/Slide1.jpg"; Alt = "Slide 1";
                Heading = "Slide 1"; Description = "Slide 1 description"; Href = "#"}
            {Src = "Images/Slideshow/Slide2.jpg"; Alt = "Slide 2";
                Heading = "Slide 2"; Description = "Slide 2 description"; Href = "#"}
            {Src = "Images/Slideshow/Slide3.jpg"; Alt = "Slide 3";
                Heading = "Slide 3"; Description = "Slide 3 description"; Href = "#"}
            {Src = "Images/Slideshow/Slide4.jpg"; Alt = "Slide 4";
                Heading = "Slide 4"; Description = "Slide 4 description"; Href = "#"}
        ] |> List.map (fun x -> slideDiv x "512" "958")

    [<JavaScriptAttribute>]
    let slideshow () =
        Div [Attr.Id "slideshow"] -< [
            Div [Attr.Id "slidesContainer"] -< [
                yield! slides
                ]
            Span [Attr.Class "carouselControl"; Id "leftControl"; Text "‹"]
            Span [Attr.Class "carouselControl"; Id "rightControl"; Text "›"]
            ] |>! OnAfterRender (fun _ -> animateSlideshow 700 4000)

    type SlideshowViewer () =
        inherit Web.Control ()

        [<JavaScriptAttribute>]
        override this.Body =
            slideshow () :> _