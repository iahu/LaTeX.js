import
    './base': { Base }


export class Minimal extends Base

    # public static
    @css = "css/article.css"


    # CTOR
    (generator, options) ->
        super ...

        @g.setLength \textwidth new @g.Length 6.5, "in"
        @g.setLength \textheight new @g.Length 8, "in"
