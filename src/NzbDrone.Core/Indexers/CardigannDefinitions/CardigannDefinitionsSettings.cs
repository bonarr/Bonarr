using System;
using FluentValidation;
using NzbDrone.Core.Annotations;
using NzbDrone.Core.ThingiProvider;
using NzbDrone.Core.Validation;

namespace NzbDrone.Core.Indexers.CardigannDefinitions
{
    public class CardigannDefinitionsSettingsValidator : AbstractValidator<CardigannDefinitionsSettings>
    {
        public CardigannDefinitionsSettingsValidator()
        {
            RuleFor(c => c.DefinitionLocation).ValidRootUrl();
        }
    }

    public class CardigannDefinitionsSettings : IProviderConfig
    {
        private static readonly CardigannDefinitionsSettingsValidator Validator = new CardigannDefinitionsSettingsValidator();

        public CardigannDefinitionsSettings()
        {
            DefinitionLocation = "Indexers/CardigannDefinitions/Definitions/nyaa-pantsu.yaml";
        }

        public string DefinitionLocation { get; set; }

        public NzbDroneValidationResult Validate()
        {
            return new NzbDroneValidationResult(Validator.Validate(this));
        }
    }
}
