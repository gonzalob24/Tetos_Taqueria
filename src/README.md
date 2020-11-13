# Website Project

### Folder Structure

    Website folder has two folders resources and vendor. Resources has a has folders that will have css, images, javascript and data created by me. The vendor folder will have css, javascript and fonts that were downloaded from the web.
    

### CSS

    html:
        font-familiy: added Lato by default and incase it does not load Arial, then sans-serif will load
        text-rendering: optimizedLegibility is used for better rendering
    
    Responsive Web design:
        Easy to read and changes with browsers width
        1.Fluid Grid: All layout elements are sized in relative units such as rem or % instead of absolute units llike pixels
        2.Flexible images: sized in relative units
        3.Media Queries: allow us to specify  different css style for different browser widths.
    

#### Building The Header

    ##### Part 1
    
    -Text on image: 100vh view port
    -Resize imgage
    -Vertical and Horizontal centered box
    -Buttons
    -4 links in CSS: link, visited, hover, active
 
    
    ------------
    Notes:
    -h1 has empty space from top due to the normalizer so i need to manually set the margin: 0; to remove the indent.
    -to center the hero-text-box by changing the position to absolute and moving it top and left 50% and then use
        transform: translate(-50%, -50%)
    --
    .button:link,
    .button:visited { }
        
        
        
        
        
        
        
        
        
        
        
        
        
    
