const express = require("express"),
    router = express.Router();

const python_path = "/home/alotaima/miniconda3/bin/python";

function getProgramPath(project) {
    const rootFolder = __dirname.split("/");
    rootFolder.splice(-2, 2, `ai/${project}/main.py`);
    return rootFolder.join("/");
}

function launchProcess(res, args) {
    const spawn = require("child_process").spawn,
        process = spawn(python_path, args);

    let output = "";

    process.stdout.on("data", function (data) {
        output += data.toString();
    });

    process.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
    });
    process.on("close", (code) => {
        console.log(output);
        res.send(JSON.stringify(output));
    });
}

router.post("/style_transfer", (req, res) => {
    const args = [
        getProgramPath("BlendGAN"),
        `--url`,
        `${req.body.url}`,
        `--style_selected`,
        `${req.body.style_selected}`,
        `--filename`,
        `${req.body.filename}`,
    ];

    launchProcess(res, args);
});

router.post("/pixel", (req, res) => {
    const args = [
        getProgramPath("pixel"),
        `--url`,
        `${req.body.url}`,
        `--palette`,
        `${req.body.palette}`,
        `--filename`,
        `${req.body.filename}`,
    ];

    launchProcess(res, args);
});

router.post("/arcane", (req, res) => {
    const args = [
        getProgramPath("ArcaneGAN"),
        `--url`,
        `${req.body.url}`,
        `--filename`,
        `${req.body.filename}`,
    ];

    launchProcess(res, args);
});

router.post("/chat", (req, res) => {
    const args = [getProgramPath("chat"), `--message`, `${req.body.message}`];

    launchProcess(res, args);
});

router.post("/wolf", (req, res) => {
    const args = [getProgramPath("wolf"), `--message`, `${req.body.message}`];

    launchProcess(res, args);
});

router.post("/ar", (req, res) => {
    const args = [getProgramPath("ar"), `--message`, `${req.body.message}`];

    launchProcess(res, args);
});

router.post("/en", (req, res) => {
    const args = [getProgramPath("en"), `--message`, `${req.body.message}`];

    launchProcess(res, args);
});

router.post("/anime", (req, res) => {
    const args = [
        getProgramPath("anime"),
        `--url`,
        `${req.body.url}`,
        `--filename`,
        `${req.body.filename}`,
    ];

    launchProcess(res, args);
});

module.exports = router;
