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
            url: 'https://compile-run-code.herokuapp.com/',
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

    runCodes = async (req, res) => {
        let promies = [];
        for (let index = 0; index < 10; index++) {
            promies.push(this.compileCode({ a: 2 }));
        }
        Promise.allSettled(promies)
            .then((values) => {
                res.json(
                    values.map((item) => {
                        return item.status === 'fulfilled' ? item.value.data : item.reason;
                    }),
                );
            })
            .catch((error) => {
                res.send(error);
            });
    };
}
module.exports = new CompileCodeController();
