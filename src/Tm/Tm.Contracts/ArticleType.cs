using System.ComponentModel.DataAnnotations;

namespace Tm.Contracts
{
    public enum ArticleType
    {
        ComputerScience = 1,
        BasicMedicine = 2,
        HistoryAndArcheology = 3,
        VeterinaryScience = 4,
        CivilEngineering = 5,

        [Display(Name = "СМИ и коммуникации")]
        SmiAndCommunications = 6,
    }
}