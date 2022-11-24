using DataModels;

namespace Parsers
{
    public class AdviserParser
    {
        private string _inputHTML = string.Empty;
        private MyDataModel dm = new MyDataModel();

        AdviserParser(string _inputHTML)
        {
            this._inputHTML = _inputHTML;
        }


    }
}