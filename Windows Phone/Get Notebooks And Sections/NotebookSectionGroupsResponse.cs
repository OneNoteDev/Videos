using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OneNotePhoneApp
{
    class NotebookSectionGroupsResponse
    {
        public class SectionsUrl
        {
            public string href { get; set; }
        }

        public class SectionGroupsUrl
        {
            public string href { get; set; }
        }

        public class Self
        {
            public string href { get; set; }
        }

        public class OneNoteWebUrl
        {
            public string href { get; set; }
        }

        public class Links
        {
            public SectionsUrl sectionsUrl { get; set; }
            public SectionGroupsUrl sectionGroupsUrl { get; set; }
            public Self self { get; set; }
            public OneNoteWebUrl oneNoteWebUrl { get; set; }
        }

        public class SectionGroup
        {
            public Links links { get; set; }
            public string id { get; set; }
            public string name { get; set; }
            public string createdBy { get; set; }
            public string lastModifiedBy { get; set; }
            public string createdTime { get; set; }
            public string lastModifiedTime { get; set; }
            public override string ToString()
            {
                return "[" + name + " (" + createdBy + ")]";
            }
        }

        public class RootObject
        {
            [JsonProperty("@odata.context")]
            public string Context { get; set; }

            [JsonProperty("value")]
            public List<SectionGroup> SectionGroups { get; set; }
        }
    }
}
