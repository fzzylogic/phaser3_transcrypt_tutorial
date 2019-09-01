[Phaser 3 game tutorial](http://phaser.io/tutorials/making-your-first-phaser-3-game)
in Python syntax, compilable with [Transcrypt](https://transcrypt.org/).

Left javascript's 'this', which more determined folks may wish to
avoid.

Set up as follows:

    git clone project_url           # e.g. Use the url for this github project
    cd project_name
    py -3 -m venv env               # or python3 -m venv env on linux
    env\Scripts\activate            # or env/bin/activate on linux
    
    python -m pip install --upgrade pip setuptools wheel
    
    pip install transcrypt          # on ubuntu linux may 1st need 'apt-get install python3-dev'
    transcrypt -b -m -n game.py
    python -m http.server 8001      # or choose another from [here](https://gist.github.com/willurd/5720255)

Point browser to localhost:8001

Updated for Transcrypt 3.7.16:

    <script type="text/javascript" src="__javascript__/game.js"></script>
    # updated to
    <script type="module" src="__target__/game.js"></script>


[License](https://github.com/photonstorm/phaser/blob/master/LICENSE.md)
