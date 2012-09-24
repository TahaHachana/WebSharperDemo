(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,jQuery,Website,Crawler,Client,WebSharper,Arrays,document,Html,Default,List,EventsPervasives,Remoting,alert,Concurrency,Formlet,Formlet1,Enhance,Data,Slideshow,setInterval,Operators,Seq;
 Runtime.Define(Global,{
  Website:{
   Crawler:{
    Client:{
     appendTd:function(text,tableRow)
     {
      return jQuery("<td/>").text(text).appendTo(tableRow);
     },
     clearTable:function()
     {
      return Client.removeRows("#table tr");
     },
     displayData:function(data,selector)
     {
      var x,f,mapping,f1,action;
      x=(f=(mapping=Runtime.Tupled(function(tupledArg)
      {
       var x1,y,z;
       x1=tupledArg[0];
       y=tupledArg[1];
       z=tupledArg[2];
       return Client.tableRow(x1,y,z);
      }),function(array)
      {
       return Arrays.map(mapping,array);
      }),f(data));
      f1=(action=function(x1)
      {
       return x1.appendTo(jQuery(selector));
      },function(array)
      {
       return Arrays.iter(action,array);
      });
      return f1(x);
     },
     focusInput:function()
     {
      return jQuery(document).ready(function()
      {
       return jQuery("#seed").focus();
      });
     },
     removeRows:function(selector)
     {
      return jQuery(selector).each(function(idx)
      {
       if(idx===0)
        {
         return null;
        }
       else
        {
         return jQuery(this).remove();
        }
      });
     },
     tableRow:function(requestUri,statusCode,contentType)
     {
      var tr;
      tr=jQuery("<tr/>");
      Client.appendTd(requestUri,tr);
      Client.appendTd(statusCode,tr);
      Client.appendTd(contentType,tr);
      return tr;
     },
     urlForm:function()
     {
      var urlInput,x,f,x1,submitBtn,x2,f1,x3,urlInputFormlet,x6,f5,submitBtnFormlet,form,x7,x8,f6;
      urlInput=(x=Default.Input(List.ofArray([Default.Id("seed")])),(f=(x1=function()
      {
       return function(key)
       {
        var _key_;
        _key_=key.KeyCode;
        if(_key_===13)
         {
          return jQuery("#submitButton").click();
         }
        else
         {
          return null;
         }
       };
      },function(arg10)
      {
       return EventsPervasives.Events().OnKeyDown(x1,arg10);
      }),(f(x),x)));
      submitBtn=(x2=Default.Button(List.ofArray([Default.Text("Submit"),Default.Id("submitButton"),Default.Attr().Class("btn btn-primary")])),(f1=(x3=function()
      {
       return function()
       {
        var x4,f2,f4;
        x4=(f2=function()
        {
         var url,loaderJquery,x5,f3;
         Client.clearTable();
         url=urlInput.get_Value();
         loaderJquery=jQuery("#loader");
         loaderJquery.css("visibility","visible");
         x5=Remoting.Async("Website:0",[url]);
         f3=function(_arg1)
         {
          var data,matchValue;
          loaderJquery.css("visibility","hidden");
          if(_arg1.$==1)
           {
            data=_arg1.$0;
            matchValue=data.length;
            if(matchValue===0)
             {
              alert("Crawling failed, check the provided URL.");
              return Concurrency.Return(null);
             }
            else
             {
              Client.displayData(data,"#table");
              return Concurrency.Return(null);
             }
           }
          else
           {
            alert("The URL is not valid.");
            return Concurrency.Return(null);
           }
         };
         return Concurrency.Bind(x5,f3);
        },Concurrency.Delay(f2));
        f4=function(arg00)
        {
         var t;
         t={
          $:0
         };
         return Concurrency.Start(arg00);
        };
        return f4(x4);
       };
      },function(arg10)
      {
       return EventsPervasives.Events().OnClick(x3,arg10);
      }),(f1(x2),x2)));
      urlInputFormlet=(x6=Formlet1.OfElement(function()
      {
       return urlInput;
      }),(f5=function(formlet)
      {
       return Enhance.WithTextLabel("URL:",formlet);
      },f5(x6)));
      submitBtnFormlet=Formlet1.OfElement(function()
      {
       return submitBtn;
      });
      form=(x7=Data.$(Data.$((x8=function()
      {
       return function()
       {
        return null;
       };
      },Formlet1.Return(x8)),urlInputFormlet),submitBtnFormlet),(f6=function(formlet)
      {
       return Enhance.WithFormContainer(formlet);
      },f6(x7)));
      return Formlet1.Run(function()
      {
       return null;
      },form);
     }
    },
    CrawlerFormViewer:Runtime.Class({
     get_Body:function()
     {
      Client.focusInput();
      return Client.urlForm();
     }
    })
   },
   Slideshow:{
    SlideshowViewer:Runtime.Class({
     get_Body:function()
     {
      return Slideshow.slideshow();
     }
    }),
    animateSlideshow:function(animationSpeed,interval)
    {
     var animationAllowed,slider,frameWidth,_frameWidth_,itemCount,width,slideLeft,slideRight,autoSlide,x,f;
     animationAllowed={
      contents:true
     };
     slider=jQuery("#slidesContainer");
     frameWidth=slider.width();
     _frameWidth_="-"+Global.String(frameWidth)+"px";
     itemCount=jQuery(".slide").length;
     width=Global.String(itemCount*frameWidth)+"px";
     slider.css("width",width);
     jQuery(".slide").filter(":first").before(jQuery(".slide").filter(":last"));
     slider.css("left",_frameWidth_);
     slideLeft=function()
     {
      jQuery(".slide").filter(":last").after(jQuery(".slide").filter(":first"));
      slider.css("left","0px");
      return slider.animate({
       left:-frameWidth
      },animationSpeed);
     };
     slideRight=function()
     {
      return slider.animate({
       left:0
      },animationSpeed,function()
      {
       slider.css("left",_frameWidth_);
       return jQuery(".slide").filter(":first").before(jQuery(".slide").filter(":last"));
      });
     };
     autoSlide=function()
     {
      var matchValue;
      matchValue=animationAllowed.contents;
      if(matchValue)
       {
        return slideLeft(null);
       }
      else
       {
        return null;
       }
     };
     x=setInterval(autoSlide,interval);
     f=function(value)
     {
      value;
     };
     f(x);
     jQuery(".slide, .carouselControl").hover(function()
     {
      animationAllowed.contents=false;
     });
     jQuery(".slide").mouseout(function()
     {
      animationAllowed.contents=true;
     });
     return jQuery(".carouselControl").click(function()
     {
      var x1,f1;
      x1=jQuery(this).attr("id")==="rightControl";
      f1=function(_arg1)
      {
       if(_arg1)
        {
         return slideLeft(null);
        }
       else
        {
         return slideRight(null);
        }
      };
      return f1(x1);
     });
    },
    slideDiv:function(slide,height,width)
    {
     return Operators.add(Default.Div(List.ofArray([Default.Attr().Class("slide")])),List.ofArray([Default.Img(List.ofArray([Default.Src(slide.Src),Default.Alt(slide.Alt),Default.Height(height),Default.Width(width)])),Operators.add(Default.Div(List.ofArray([Default.Attr().Class("carouselCaption")])),List.ofArray([Default.H4(List.ofArray([Default.Text(slide.Heading)])),Default.P(List.ofArray([Default.Text(slide.Description)])),Default.A(List.ofArray([Default.Text("Click Here"),Default.HRef(slide.Href)]))]))]));
    },
    slides:Runtime.Field(function()
    {
     var x,f,mapping;
     x=List.ofArray([{
      Src:"Images/Carousel/Slide1.jpg",
      Alt:"Slide 1",
      Heading:"Slide 1",
      Description:"Slide 1 description",
      Href:"#"
     },{
      Src:"Images/Carousel/Slide2.jpg",
      Alt:"Slide 2",
      Heading:"Slide 2",
      Description:"Slide 2 description",
      Href:"#"
     },{
      Src:"Images/Carousel/Slide3.jpg",
      Alt:"Slide 3",
      Heading:"Slide 3",
      Description:"Slide 3 description",
      Href:"#"
     },{
      Src:"Images/Carousel/Slide4.jpg",
      Alt:"Slide 4",
      Heading:"Slide 4",
      Description:"Slide 4 description",
      Href:"#"
     }]);
     f=(mapping=function(x1)
     {
      return Slideshow.slideDiv(x1,"512","958");
     },function(list)
     {
      return List.map(mapping,list);
     });
     return f(x);
    }),
    slideshow:function()
    {
     var x,_this,_this1,f,f1;
     x=Operators.add(Default.Div(List.ofArray([(_this=Default.Attr(),_this.NewAttr("id","slideshow"))])),List.ofArray([Operators.add(Default.Div(List.ofArray([(_this1=Default.Attr(),_this1.NewAttr("id","slidesContainer"))])),Seq.toList(Seq.delay(function()
     {
      return Slideshow.slides();
     }))),Default.Span(List.ofArray([Default.Attr().Class("carouselControl"),Default.Id("leftControl"),Default.Text("\u2039")])),Default.Span(List.ofArray([Default.Attr().Class("carouselControl"),Default.Id("rightControl"),Default.Text("\u203a")]))]));
     f=(f1=function()
     {
      return Slideshow.animateSlideshow(700,4000);
     },function(w)
     {
      return Operators.OnAfterRender(f1,w);
     });
     f(x);
     return x;
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  jQuery=Runtime.Safe(Global.jQuery);
  Website=Runtime.Safe(Global.Website);
  Crawler=Runtime.Safe(Website.Crawler);
  Client=Runtime.Safe(Crawler.Client);
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  Arrays=Runtime.Safe(WebSharper.Arrays);
  document=Runtime.Safe(Global.document);
  Html=Runtime.Safe(WebSharper.Html);
  Default=Runtime.Safe(Html.Default);
  List=Runtime.Safe(WebSharper.List);
  EventsPervasives=Runtime.Safe(Html.EventsPervasives);
  Remoting=Runtime.Safe(WebSharper.Remoting);
  alert=Runtime.Safe(Global.alert);
  Concurrency=Runtime.Safe(WebSharper.Concurrency);
  Formlet=Runtime.Safe(WebSharper.Formlet);
  Formlet1=Runtime.Safe(Formlet.Formlet);
  Enhance=Runtime.Safe(Formlet.Enhance);
  Data=Runtime.Safe(Formlet.Data);
  Slideshow=Runtime.Safe(Website.Slideshow);
  setInterval=Runtime.Safe(Global.setInterval);
  Operators=Runtime.Safe(Html.Operators);
  return Seq=Runtime.Safe(WebSharper.Seq);
 });
 Runtime.OnLoad(function()
 {
  Slideshow.slides();
 });
}());
