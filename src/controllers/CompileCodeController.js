var axios = require('axios');
var qs = require('qs');

class CompileCodeController {
    async compileCode(reqCode) {
        var data = qs.stringify({
            code: 'import java.util.Scanner;\npublic class MatSym {\n    public static void main(String[]args) {\n       Scanner in = new Scanner(System.in);\nSystem.out.println(in.nextLine());\nSystem.out.println(in.nextLine());\n    }\n}',
            language: 'java',
            input: 'Hello\nWorld',
        });
        var config = {
            method: 'post',
            url: 'https://codex-api.herokuapp.com/',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data,
        };
        return axios(config);
    }

    runCode = async (req, res) => {
        try {
            const result = await this.compileCode({ a: 1 });
            res.send(result.data);
        } catch (error) {
            res.send(error);
        }
    };

    runCodes(req, res) {
        res.send('runCode OK');
    }
}
module.exports = new CompileCodeController();
