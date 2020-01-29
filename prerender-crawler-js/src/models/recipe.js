var recipe = {
    id : "", // Record ID
    name : "", // Name
    url : "", // Location of recipe webpage at https://www.brewersfriend.com
    style : "", // Type of brew
    style_id : "", // Numeric ID for type of brew
    size_l : "", // Amount brewed for recipe listed
    og : "", // Specific gravity of wort before fermentation
    fg : "", // Specific gravity of wort after fermentation
    abv : "", // Alcohol By Volume
    ibu : "", // International Bittering Units
    color : "", // Standard Reference Method - light to dark ex. 40 = black
    boil_size : "", // Fluid at beginning of boil
    boil_time : "", // Time wort is boiled
    boil_gravity : "", // Specific gravity of wort before the boil
    efficiency : "", // Beer mash extraction efficiency - extracting sugars from the grain during mash
    mash_thickness : "", // Amount of water per pound of grain
    sugar_scale : "", // Scale to determine the concentration of dissolved solids in wort
    brew_method : "", // Various techniques for brewing
    pitch_rate : "", // Yeast added to the fermentor per gravity unit - M cells/ml/deg P
    primary_temp : "", // Temperature at the fermenting stage
    priming_method : "", // N
    priming_amount : "", // Amount of priming sugar used
    user_id : "" // user_id
}

exports.recipe = recipe;