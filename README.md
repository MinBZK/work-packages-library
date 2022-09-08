# Introduction
With [regels.overheid.nl](https://open-regels.nl/) we are creating a public library that is accessible to everyone and that we are slowly but surely filling with legal analyses, rule specifications, software code and everything else that is needed and that can be used by public institutions. The intention is that it concerns open source software, and that therefore no property rights will accrue to anyone.

This filling is partly marketed in a public, transparent, equal and accessible manner for everyone. We want to provide access for all parties and/or persons who are interested in contributing to the renewal of the procurement market by the government in public-private partnerships (open-innovation coalition/community/ecosystem), while manoeuvring within existing legal frameworks. The agreements are always small-scale and have a short-cycle realization process (cf. agile, CI/CD for software realization).

We expect to expand this library with work packages that will find their way from other projects. Thus this isolated repository.

Ultimately, demand, supply and (partial) results of work packages will become searchable and findable via metadata.

Keep an eye on this library!

Do you have any questions or do you want to work with us? Please contact [Steven Gort](mailto:steven.gort@ictu.nl)

## License
Everything in this repository is licensed under the [EUPL 1.2](./LICENCE.md) unless stated otherwise

## Add deliverable
Use this repository by putting your deliverable(s) in the folder of your work package.

1. Fork this repository to your GitHub organization.
2. Clone this repository to your local machine.
3. Create a new branch for your work-package using `git checkout -b Work-package-name-here`.
4. Update the `index.json` with the metadata by adding a new entry at the top.
5. Add your deliverable(s). Make sure that the `Work-package-name` exactly matches the folder to be created for this (or already present). Within the `Work-package-name` folder you are free to use your own structure.
6. Describe in a `HOW TO` how someone can view the work package result and/or run it themselves.
7. Push the changes to the remote repository.
8. Submit a pull request to the upstream repository.  

## Repository structure
> This is a currently empty library. The structure below is an example.

    Work-packages-library
    +-- Work-package-name
    |   +-- Deliverable-1
    |   +-- Deliverable-2
    +-- README.md
    +-- Work-package-name
    |   +-- Deliverable
    +-- Work-package-name
    |   +-- Deliverable
    |   +-- Docs-pages
    |   |   +-- Page-1
    |   |   +-- Page-2
    +-- index.json

## Contributing
For information on how to start contributing to this library please read the [CONTRIBUTING.md](./CONTRIBUTING.md).
